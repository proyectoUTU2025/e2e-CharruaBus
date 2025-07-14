import { test, expect } from '@playwright/test';

test.describe('CU – Historial de Compras', () => {

    test('TC1 – Visualización del historial con resultados', async ({ page }) => {
        test.setTimeout(60_000);

        // 1) Login como cliente
        await page.goto(process.env.BASE_URL || 'http://localhost:4200/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('cliente@test.com');
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

        // 3) Verificar listado ordenado descendente (el seed tiene 1 compra a las 09:00)
        const rows = page.locator('mat-row');
        await expect(rows).toHaveCount(1);
        await expect(rows.first().getByRole('cell', { name: '1' })).toBeVisible();
        await expect(rows.first().getByRole('cell', { name: /10\/07\/2025/i })).toBeVisible();

        // 4) Aplicar filtro por estado "COMPLETADA"
        await page.getByRole('combobox', { name: 'Estado' }).selectOption('COMPLETADA');
        await page.getByRole('button', { name: 'Filtrar' }).click();
        await expect(rows).toHaveCount(1);

        // 5) Aplicar filtro por monto mínimo 150
        await page.getByRole('spinbutton', { name: 'Monto mínimo' }).fill('150');
        await page.getByRole('button', { name: 'Filtrar' }).click();
        // la compra del seed es 200 → sigue visible
        await expect(rows).toHaveCount(1);

        // 6) Limpiar filtros y volver a listar todas
        await page.getByRole('button', { name: 'Limpiar filtros' }).click();
        await expect(rows).toHaveCount(1);

        // 7) Seleccionar la compra para ver detalle
        await Promise.all([
            page.waitForSelector('mat-dialog-container'),
            rows.first().getByRole('button', { name: /Ver detalle/i }).click(),
        ]);
        const dialog = page.locator('mat-dialog-container').last();
        await expect(dialog.getByRole('heading', { name: 'Detalle de la compra' })).toBeVisible();

        // 8) Verificar detalles generales
        await expect(dialog.getByText(/ID:\s*1/)).toBeVisible();
        await expect(dialog.getByText(/Estado:\s*COMPLETADA/)).toBeVisible();
        await expect(dialog.getByText(/Total:\s*\$200\.00/)).toBeVisible();

        // 9) Verificar lista de pasajes asociados
        const ticketRows = dialog.locator('mat-row');
        await expect(ticketRows).toHaveCount(1);
        await expect(ticketRows.first().getByRole('cell', { name: '1' })).toBeVisible();               // pasaje id
        await expect(ticketRows.first().getByRole('cell', { name: /Asiento 1/i })).toBeVisible();
        await expect(ticketRows.first().getByRole('cell', { name: /MONTEVIDEO/i })).toBeVisible();

        // 10) Cerrar el diálogo
        await dialog.getByRole('button', { name: 'Cerrar' }).click();
        await expect(page).toHaveURL(/\/mis-compras$/);
    });

});
