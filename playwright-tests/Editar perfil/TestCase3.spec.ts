import { test, expect } from '@playwright/test';

test.describe('CU1.3 – TC3: Guardar deshabilitado con fecha inválida', () => {
    test.beforeEach(async ({ page }) => {
        // 1. Login
        await page.goto('/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Admin123!$');
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();

        // 2. Ir a “Mi Perfil”
        await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();

        // 3. Esperar a que el input de fecha aparezca (indica que el formulario cargó)
        const fechaInput = page.getByRole('textbox', { name: 'Fecha de Nacimiento' });
        await fechaInput.waitFor({ state: 'visible' });
    });

    test('Guardar está deshabilitado con fecha inválida', async ({ page, browserName }) => {
        // Saltar en WebKit porque ese navegador mantiene el backdrop bloqueando el input
        test.skip(browserName === 'webkit', 'Skipping on WebKit due to backdrop issue');

        const fechaInput = page.getByRole('textbox', { name: 'Fecha de Nacimiento' });
        const guardarBtn = page.getByRole('button', { name: 'Guardar' });

        // Asegurarnos de que tenga un valor inicial
        await page.waitForFunction(
            el => (el as HTMLInputElement).value !== '',
            await fechaInput.elementHandle()
        );

        // 4. Ingresar una fecha inválida
        await fechaInput.fill('13/13/1990');

        // 5. Verificar que el botón Guardar esté deshabilitado
        await expect(guardarBtn).toBeDisabled();

        // 6. Corregir a una fecha válida y verificar que se habilita
        await fechaInput.fill('12/12/1990');
        await expect(guardarBtn).toBeEnabled();
    });
});
