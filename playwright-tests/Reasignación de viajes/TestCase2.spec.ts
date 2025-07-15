import { test, expect } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:4200';

test.describe('CU 4.12 – Reasignación de viajes', () => {
    test('TC2 – No hay ómnibus disponibles para la reasignación', async ({ page, browserName }) => {
        test.skip(browserName === 'chromium' || browserName === 'webkit', 'Inestable en Chromium/WebKit');

        // 1) Login
        await page.goto(BASE);
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Ir a Viajes
        await Promise.all([
            page.waitForURL('**/viajes'),
            page.locator('mat-toolbar').getByRole('link', { name: 'Viajes' }).click(),
        ]);

        // 3) Filtrar misma fecha
        await page.locator('mat-form-field', { hasText: 'Fecha hasta' })
            .getByLabel('Open calendar').click();
        await page.getByRole('button', { name: 'Next month' }).click();
        await page.getByRole('button', { name: 'Next month' }).click();
        await page.getByRole('button', { name: '31 de octubre de 2025', exact: true }).click();
        await page.getByRole('button', { name: 'Buscar' }).click();

        // 4) Abrir reasignación de viaje #2
        const viajeRow2 = page.getByRole('row', { name: '2 MONTEVIDEO - Terminal Tres' });
        await expect(viajeRow2).toBeVisible({ timeout: 10_000 });
        await viajeRow2.getByRole('button', { name: 'Reasignar Ómnibus' }).click();

        // 5) No hay ómnibus
        await expect(
            page.getByRole('heading', { name: 'No hay ómnibus disponibles' })
        ).toBeVisible();
        await expect(
            page.getByText('No se encontraron ómnibus disponibles')
        ).toBeVisible();
    });
});
