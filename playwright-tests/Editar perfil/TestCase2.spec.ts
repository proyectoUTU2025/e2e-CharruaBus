import { test, expect } from '@playwright/test';

test.describe('CU1.3 – Edición de perfil', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Login
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email' })
      .fill('nogixid916@jxbav.com');
    await page.getByRole('textbox', { name: 'Contraseña' })
      .fill('nicobentaTest!1');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  });

  test('TC2: Cancelar edición de perfil deja los datos sin cambios', async ({ page }) => {
    // 2. Ir a "Mi Perfil" y abrir edición
    await page.getByRole('link', { name: 'Mi Perfil' }).click();
    await page.getByRole('button', { name: 'Editar perfil' }).click();

    // 3. Capturar valor original de Apellido
    const apellidoInput = page.getByRole('textbox', { name: 'Apellido' });
    const valorOriginal = await apellidoInput.inputValue();

    // 4. Cambiar el Apellido y cancelar
    await apellidoInput.fill('BentaTemporal');
    await page.getByRole('button', { name: 'Cancelar' }).click();

    // 5. Verificar que sigue en "Mi Perfil" y que el Apellido volvió al valor original
    await expect(apellidoInput).toHaveValue(valorOriginal);
  });
});
