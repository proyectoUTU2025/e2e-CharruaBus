import { test, expect } from '@playwright/test';

test.describe('CU 4.3 – Listado y búsqueda de localidades', () => {
    test('TC3 – No hay coincidencias con los filtros aplicados', async ({ page }) => {
        test.setTimeout(20_000);

        // 1) Login como vendedor
        await page.goto(process.env.BASE_URL || 'http://localhost:4200');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Acceder a Localidades
        await Promise.all([
            page.waitForURL('**/localidades'),
            page.locator('mat-toolbar').getByText('Localidades').click(),
        ]);

        // 3) Aplicar filtros que no existan
        await page.getByRole('textbox', { name: 'Nombre' }).fill('XYZsinMatch');
        await page.getByRole('combobox', { name: 'Departamento' }).locator('svg').click();
        await page.getByRole('option', { name: 'ARTIGAS' }).click();

        // 4) Pulsar “Continuar”
        await Promise.all([
            page.waitForResponse('**/api/localidades?**'),
            page.getByRole('button', { name: 'Continuar' }).click(),
        ]);

        // 5) Verificar mensaje de “sin resultados”
        await expect(page.getByText(
            'No hay resultados que coincidan con los filtros ingresados'
        )).toBeVisible();

        // 6) Confirmar que permite limpiar y reintentar
        await expect(page.getByRole('button', { name: 'Limpiar filtros' })).toBeEnabled();
    });
});
