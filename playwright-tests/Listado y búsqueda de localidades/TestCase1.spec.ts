import { test, expect } from '@playwright/test';

test.describe('CU 4.3 – Listado y búsqueda de localidades', () => {
    test('TC1 – Búsqueda de localidades con filtros válidos', async ({ page }) => {
        test.setTimeout(30_000);

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

        // 3) Aplicar filtros
        await page.getByRole('textbox', { name: 'Nombre' }).fill('Terminal');
        await page.getByRole('combobox', { name: 'Departamento' }).locator('svg').click();
        await page.getByRole('option', { name: 'MONTEVIDEO' }).click();
        
        // 4) Pulsar “Continuar”
        await Promise.all([
            page.waitForResponse('**/api/localidades?**'),
            await page.getByRole('button', { name: 'Buscar' }).click(),
        ]);

        // 5) Verificar listado filtrado
        const filas = page.getByRole('row');
        await expect(filas.filter({ hasText: 'Terminal Tres Cruces' })).toBeVisible();
        await expect(filas.filter({ hasText: 'MONTEVIDEO' })).toHaveCount(1);

        // 6) Ordenar por nombre
        await page.getByRole('combobox', { name: 'Ordenar por' }).selectOption('nombre');
        // Asumimos que la primera fila de datos (row.nth(1)) es la esperada
        await expect(page.getByRole('row').nth(1)).toContainText('Terminal Tres Cruces');
    });
});
