import { test, expect } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:4200';

test.describe('CU 4.12 – Reasignación de viajes', () => {
    test('TC1 – Reasignación exitosa de viaje a otro ómnibus', async ({ page, browserName }) => {
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

        // 3) Filtrar fecha hasta 31/oct/2025
        await page.locator('mat-form-field', { hasText: 'Fecha hasta' })
            .getByLabel('Open calendar').click();
        await page.getByRole('button', { name: 'Next month' }).click();
        await page.getByRole('button', { name: 'Next month' }).click();
        await page.getByRole('button', { name: '31 de octubre de 2025', exact: true }).click();
        await page.getByRole('button', { name: 'Buscar' }).click();

        // 4) Abrir reasignación de viaje #1
        const viajeRow = page.getByRole('row', { name: '1 MONTEVIDEO - Terminal Tres' });
        await expect(viajeRow).toBeVisible({ timeout: 10_000 });
        await viajeRow.getByRole('button', { name: 'Reasignar Ómnibus' }).click();

        // 5) Diálogo
        const dialog = page.locator('mat-dialog-container');
        await expect(dialog).toBeVisible({ timeout: 5_000 });

        // 6) Seleccionar BRO-2222
        const broRow = dialog.getByRole('row', { name: /BRO-2222/ });
        await expect(broRow).toBeVisible({ timeout: 5_000 });
        await broRow.getByRole('button', { name: 'Seleccionar' }).click();

        // 7) Confirmar
        await dialog.getByRole('button', { name: 'Confirmar' }).click();

        // 8) Mensaje de éxito
        await expect(page.getByText(/Ómnibus seleccionado: BRO-2222/))
            .toBeVisible({ timeout: 5_000 });
    });
});
