import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('CU 4.13 – Listado de pasajes vendidos por viaje', () => {
    test('TC1 – Consulta exitosa del listado de pasajes vendidos para un viaje', async ({ page }) => {
        test.setTimeout(60_000);

        // 1) Login como vendedor
        await page.goto(process.env.BASE_URL || 'http://localhost:4200/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Ir a "Viajes"
        await Promise.all([
            page.waitForURL('**/viajes'),
            page.getByRole('link', { name: 'Viajes' }).click(),
        ]);
        await expect(page.getByRole('heading', { name: /Listado y búsqueda de viajes/i })).toBeVisible();

        // 3) Buscar el viaje con fecha 10 de julio
        await page.getByLabel('Open calendar').click();
        await page.getByRole('button', { name: '10 de julio de 2025' }).click();
        await page.getByRole('button', { name: 'Buscar' }).click();

        // 4) Verificar que la lista muestra nuestro viaje
        const viajeRow = page.getByRole('row', {
            name: /1 MONTEVIDEO - Terminal Tres MALDONADO - Punta del Este/i
        });
        await expect(viajeRow).toBeVisible();

        // 5) Abrir "Historial de Pasajes" de ese viaje
        await Promise.all([
            page.waitForSelector('mat-dialog-container'),
            viajeRow.getByRole('button', { name: /Historial/i }).click(),
        ]);

        const dialog = page.locator('mat-dialog-container').last();
        await expect(dialog.getByRole('heading', { name: /Historial de Pasajes/i })).toBeVisible();

        // 6) Sin filtros → Buscar → Debe aparecer al menos un pasaje
        await dialog.getByRole('button', { name: 'Buscar' }).click();
        const pasajeRow = dialog.getByRole('row', { name: /cliente@test.com Asiento1 CONFIRMADO/i });
        await expect(pasajeRow).toBeVisible();

        // 7) Filtrar por número de asiento
        await dialog.getByRole('spinbutton', { name: 'Número de asiento' }).fill('1');
        await dialog.getByRole('button', { name: 'Buscar' }).click();
        await expect(dialog.getByRole('row', { name: /cliente@test.com Asiento1 CONFIRMADO/i })).toBeVisible();

        // 8) Filtrar por estado "CONFIRMADO"
        await dialog.getByRole('combobox', { name: 'Estado' }).selectOption('CONFIRMADO');
        await dialog.getByRole('button', { name: 'Buscar' }).click();
        await expect(dialog.getByRole('row', { name: /cliente@test.com Asiento1 CONFIRMADO/i })).toBeVisible();

        // 9) Limpiar filtros y volver a buscar → se muestra la lista completa
        await dialog.getByRole('button', { name: 'Limpiar' }).click();
        await dialog.getByRole('button', { name: 'Buscar' }).click();
        // (en este seed solo hay uno, pero si hubiera más, aquí deberían verse todos)
        await expect(dialog.getByRole('row')).toHaveCount(1);

        // 10) Verificar detalles de un pasaje al expandir fila
        await Promise.all([
            dialog.locator('.pasaje-detalle').waitFor(),
            pasajeRow.getByRole('button', { name: /Ver detalle/i }).click(),
        ]);
        await expect(dialog.getByText('Método de pago')).toBeVisible();
        await expect(dialog.getByText(/Tarjeta/i)).toBeVisible();

        // 11) Cerrar diálogo
        await dialog.getByRole('button', { name: 'Cerrar' }).click();
        await expect(page).toHaveURL(/\/viajes$/);
    });
});
