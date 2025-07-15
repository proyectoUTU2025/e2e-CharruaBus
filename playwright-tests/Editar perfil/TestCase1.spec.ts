import { test, expect } from '@playwright/test';

test.describe('CU1.3 – Edición de perfil', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // flujo de login, lo puedes extraer a un helper
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' })
            .fill('nogixid916@jxbav.com');
        await page.getByRole('textbox', { name: 'Contraseña' })
            .fill('nicobentaTest!1');
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    });

    test('TC1: Editar perfil exitosamente', async ({ page }) => {
        // 1. Acceder a “Mi Perfil”
        await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();

        // 2. Modificar campo Apellido
        const apellido = page.getByRole('textbox', { name: 'Apellido' });
        await apellido.fill('BentancorTest');

        // 3. Guardar y verificar mensaje de éxito
        await page.getByRole('button', { name: 'Guardar' }).click();
        await expect(page.getByText('¡Perfil actualizado con éxito!')).toBeVisible();

        // 4. Volver a “Mi Perfil” y comprobar valor
        await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();
        await expect(apellido).toHaveValue('BentancorTest');
    });

});
