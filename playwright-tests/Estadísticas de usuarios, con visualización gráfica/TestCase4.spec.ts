// tests/stats/cu_3_5/TC4_error_descarga.spec.ts
import { test, expect } from '@playwright/test';

test.describe('CU 3.5 – Estadísticas de usuarios', () => {
    test.beforeEach(async ({ page }) => {
        // Login como administrador
        await page.goto('/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('admin');
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();

        // Ir a Estadísticas → Usuarios
        await page.locator('mat-toolbar').getByRole('button', { name: 'Estadísticas' }).click();
        await page.getByRole('menuitem', { name: 'Usuarios' }).click();
    });

    test('TC4: Error al generar CSV', async ({ page }) => {
        // Simular fallo en la descarga del CSV
        await page.route('**/api/statistics/export**', route =>
            route.fulfill({ status: 500, body: 'Error interno' })
        );

        // Intentar descargar CSV
        await page.getByRole('button', { name: 'CSV' }).click();

        // Verificar mensaje de error en UI
        await expect(
            page.getByText(/Error al generar el archivo\. Intente nuevamente más tarde/i)
        ).toBeVisible();

        // Confirmar que el botón sigue disponible para reintentar
        await expect(page.getByRole('button', { name: 'CSV' })).toBeVisible();
    });
});
