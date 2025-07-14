import { test, expect } from '@playwright/test';

test.describe('CU 4.3 – Listado y búsqueda de localidades', () => {
    test('TC2 – Visualizar todas las localidades sin aplicar filtros', async ({ page }) => {
        test.setTimeout(20_000);

        // 1) Login como vendedor
        await page.goto(process.env.BASE_URL || 'http://localhost:4200');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vendedorTest@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Test1234!');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Acceder a Localidades
        await Promise.all([
            page.waitForURL('**/localidades'),
            page.locator('mat-toolbar').getByText('Localidades').click(),
        ]);

        // 3) Sin filtros, pulsar “Continuar”
        await Promise.all([
            page.waitForResponse('**/api/localidades?**'),
            page.getByRole('button', { name: 'Continuar' }).click(),
        ]);

        // 4) Verificar que aparecen todas las localidades del seed
        await expect(page.getByRole('row').filter({ hasText: 'Terminal Tres Cruces' })).toBeVisible();
        await expect(page.getByRole('row').filter({ hasText: 'Punta del Este' })).toBeVisible();
    });
});
