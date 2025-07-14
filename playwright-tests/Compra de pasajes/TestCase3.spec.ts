import { test, expect } from '@playwright/test';

test.describe('CU 2.2 – Compra de pasajes', () => {
    test('TC3 – No hay viajes disponibles', async ({ page }) => {
        test.setTimeout(60_000);

        // 1) Login
        await page.goto(process.env.BASE_URL || 'http://localhost:4200');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('cliente@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Ir a “Comprar pasaje”
        await Promise.all([
            page.waitForURL('**/comprar'),
            page.locator('mat-toolbar').getByRole('link', { name: 'Comprar' }).click(),
        ]);

        // 3) Poner una fecha sin viajes (p.ej. 01/01/2000)
        await page.getByRole('combobox', { name: 'Origen' }).click();
        await page.getByRole('option', { name: 'MONTEVIDEO - Terminal Tres Cruces' }).click();
        await page.getByRole('combobox', { name: 'Destino' }).click();
        await page.getByRole('option', { name: 'MALDONADO - Punta del Este' }).click();
        await page.getByRole('button', { name: 'Open calendar' }).click();
        await page.getByRole('button', { name: '1 de enero de 2000' }).click();

        // 4) Buscar
        await Promise.all([
            page.waitForResponse('**/api/viajes?**'),
            page.getByRole('button', { name: 'Buscar' }).click(),
        ]);

        // 5) Verificar mensaje “no existen viajes…”
        await expect(page.getByText(/No existen viajes disponibles para los criterios seleccionados/i))
            .toBeVisible();
        // 6) Cambiar filtros y volver a buscar
        await page.getByRole('button', { name: 'Limpiar filtros' }).click();
        await expect(page.getByRole('button', { name: 'Buscar' })).toBeEnabled();
    });
});
