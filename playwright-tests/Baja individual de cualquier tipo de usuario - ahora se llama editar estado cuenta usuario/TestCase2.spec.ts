import { test, expect } from '@playwright/test';

test.describe('CU 3.3 – Baja individual de usuarios', () => {
    test.beforeEach(async ({ page }) => {
        // Login como admin
        await page.goto('/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('adminTest@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Test1234!');
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();

        // Ir a Usuarios
        await page.getByRole('link', { name: 'Usuarios' }).click();
    });

    test('TC2: No se desactiva cliente con pasajes futuros', async ({ page }) => {
        // Buscar al cliente con viajes futuros
        await page.getByRole('textbox', { name: 'Buscar por correo' })
            .fill('clienteConViajes@test.com');
        await page.getByRole('button', { name: 'Buscar' }).click();

        // Intentar desactivar y confirmar
        const row = page.getByRole('row', { name: /clienteConViajes@test\.com/i });
        await row.getByRole('button', { name: 'Desactivar' }).click();
        await page.getByRole('button', { name: 'Confirmar' }).click();

        // Verificar mensaje de bloqueo
        await expect(
            page.getByText(/tiene pasajes futuros y no puede ser desactivado/i)
        ).toBeVisible();

        // Verificar que el usuario sigue listado y con estado Activo
        await expect(page.getByText('clienteConViajes@test.com')).toBeVisible();
        await expect(row.getByRole('cell', { name: 'Activo' })).toBeVisible();
    });
});
