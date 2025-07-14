import { test, expect } from '@playwright/test';

test.describe('CU1.3 – TC3: Guardar deshabilitado con fecha inválida', () => {

    test.beforeEach(async ({ page }) => {
        // 1. Login
        await page.goto('/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('nogixid916@jxbav.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('nicobentaTest!1');
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();
        // 2. Navegar a Editar Perfil
        await page.getByRole('link', { name: 'Mi Perfil' }).click();
        await page.getByRole('button', { name: 'Editar perfil' }).click();
    });

    test('Guardar está deshabilitado con fecha inválida', async ({ page }) => {
        const fecha = page.getByRole('textbox', { name: 'Fecha de Nacimiento' });
        const btnGuardar = page.getByRole('button', { name: 'Guardar' });

        // 3. Ingresar una fecha inválida
        await fecha.fill('13/13/1997');

        // 4. Verificar que el botón Guardar está deshabilitado
        await expect(btnGuardar).toBeDisabled();

        // (Opcional) 5. Corregir a una fecha válida y verificar que vuelve a habilitarse
        await fecha.fill('12/13/1997');
        await expect(btnGuardar).toBeEnabled();
    });

});
