import { test, expect } from '@playwright/test';

test.describe('CU 3.3 – Baja individual de usuarios', () => {
    test.beforeEach(async ({ page }) => {
        // 1) Login como administrador
        await page.goto('/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('adminTest@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Test1234!');
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();

        // 2) Navegar a Usuarios
        await page.getByRole('link', { name: 'Usuarios' }).click();
    });

    test('TC1: Desactivación exitosa de un usuario sin pasajes futuros', async ({ page }) => {
        // 3) Buscar al usuario deseado
        await page.getByRole('textbox', { name: 'Correo' }).fill('clienteTest@test.com');
        await page.getByRole('button', { name: 'Buscar' }).click();

        // 4) Hacer clic en "Desactivar" en la fila correspondiente
        const row = page.getByRole('row', { name: /clienteTest@test\.com/i });
        await row.getByRole('button', { name: /desactivar/i }).click();

        // 5) Confirmar la acción
        await page.getByRole('button', { name: /confirmar/i }).click();

        // 6) Verificar mensaje de éxito
        await expect(page.getByText(/usuario desactivado con éxito/i)).toBeVisible();

        // 7) Verificar que el usuario aparece como inactivo
        await expect(row.getByRole('cell', { name: 'Inactivo' })).toBeVisible();
    });
});
