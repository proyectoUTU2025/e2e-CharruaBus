import { test, expect } from '@playwright/test';

test.describe('CU1.3 – Edición de perfil', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Ir a la pantalla de login
        await page.getByRole('link', { name: 'Login' }).click();

        // Completar email y contraseña
        await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Admin123!$');

        // Iniciar sesión
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();

        // Confirmar que se cargó la barra superior
        await expect(page.locator('mat-toolbar')).toBeVisible();
    });

    test('TC1: Editar perfil exitosamente', async ({ page }) => {
        // 1. Acceder a “Mi Perfil”
        await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();

        // 2. Esperar que se cargue el formulario
        await page.waitForSelector('form');

        // 3. Localizar el campo apellido (usamos formControlName si existe)
        const apellido = page.getByRole('textbox', { name: 'Apellido' });


        // 4. Verificar que esté presente
        await expect(apellido).toHaveCount(1);
        await expect(apellido).toBeVisible();

        // 5. Limpiar y rellenar el campo
        await apellido.evaluate(input => input.value = '');
        await apellido.fill('BentancorTest');

        // 6. Guardar cambios
        await page.getByRole('button', { name: 'Guardar' }).click();

        // 7. Verificar mensaje de éxito
        await expect(page.getByText('¡Perfil actualizado con éxito!')).toBeVisible();

        // 8. Volver a "Mi Perfil" y verificar persistencia del apellido
        await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();
        await expect(apellido).toHaveValue('BentancorTest');
    });

});
