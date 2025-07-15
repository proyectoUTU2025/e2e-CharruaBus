import { test, expect } from '@playwright/test';

test.describe('CU – Historial de Compras', () => {

    test('TC2 – No hay compras registradas', async ({ page, browserName }) => {
        test.setTimeout(60_000);

        // 1) Login como cliente SIN compras
        await page.goto(process.env.BASE_URL || 'http://localhost:4200/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('cliente2@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Acceder a "Mis compras"
        await Promise.all([
            page.waitForURL('**/mis-compras'),
            page.getByRole('link', { name: 'Mis compras' }).click(),
        ]);
        await expect(page.getByRole('heading', { name: 'Mis compras' })).toBeVisible();

        // 3) Verificar mensaje de “no results” en desktop
        await expect(
            page.getByText('No se encontraron compras que coincidan con los filtros')
        ).toBeVisible();

        // 4) Simular mobile viewport y recargar
        await page.setViewportSize({ width: 375, height: 667 });
        await page.reload();

        // 5) En mobile espera “Sin resultados” y botón de limpiar
        await expect(page.getByText('Sin resultados')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Limpiar filtros' })).toBeVisible();
    });

});
