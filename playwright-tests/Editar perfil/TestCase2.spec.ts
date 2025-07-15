import { test, expect } from '@playwright/test';

test.describe('CU1.3 – Edición de perfil', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Admin123!$');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await expect(page.locator('mat-toolbar')).toBeVisible();
  });

  test('TC2: Cancelar edición de perfil deja los datos sin cambios', async ({ page }) => {
    // Ir a “Mi Perfil”
    await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();
    await expect(page.getByRole('heading', { name: 'Mi Perfil' })).toBeVisible();

    // Asegurarse que el input está visible y tiene valor cargado
    const apellidoInput = page.getByRole('textbox', { name: 'Apellido' });
    await expect(apellidoInput).toBeVisible();

    const apellidoHandle = await apellidoInput.elementHandle();
    await page.waitForFunction((el) => el && el.value !== '', apellidoHandle);

    // Capturar valor original
    const valorOriginal = await apellidoInput.inputValue();

    // Cambiar y cancelar
    await apellidoInput.fill('CambioTemporal');
    await page.locator('app-edit-personal-info').getByRole('button', { name: 'Cancelar' }).click();

    // Verificar que el valor volvió al original
    const apellidoPostCancel = await page.getByRole('textbox', { name: 'Apellido' }).inputValue();
    expect(apellidoPostCancel).toBe(valorOriginal);
  });
});
