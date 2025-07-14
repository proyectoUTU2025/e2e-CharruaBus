import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';

// Workaround para __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('CU 4.2 – Alta masiva de localidades', () => {
    test('TC2 – Ignorar duplicados e inválidos y reportar errores', async ({ page }) => {
        // Extiende el timeout para toda la prueba
        test.setTimeout(60_000);

        // 1) Login como vendedor
        await page.goto(process.env.BASE_URL || 'http://localhost:4200');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vendedorTest@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Test1234!');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Navegar a Localidades → Alta Masiva
        await Promise.all([
            page.waitForURL('**/localidades'),
            page.locator('mat-toolbar').getByRole('link', { name: 'Localidades' }).click(),
        ]);
        await page.getByRole('button', { name: 'Alta Masiva' }).click();

        // 3) Subir CSV con duplicados/inválidos
        const csvPath = path.resolve(__dirname, '../../tests/fixtures/localidades/alta_duplicadas.csv');
        await page.locator('input[type="file"]').setInputFiles(csvPath);

        // 4) Procesar y esperar al diálogo de resultado
        const dialog = page.locator('mat-dialog-container').last();
        await Promise.all([
            dialog.getByRole('heading', { name: 'Proceso Finalizado' }).waitFor({ timeout: 30_000 }),
            page.getByRole('button', { name: 'Procesar Archivo' }).click(),
        ]);

        // 5) Validar los mensajes clave (evitamos hacer match exacto sobre los <strong>)
        await expect(dialog.getByText('Se procesaron')).toBeVisible();
        await expect(dialog.getByText('registros en total.')).toBeVisible();
        await expect(dialog.getByText(/localidades fueron creadas exitosamente\./i)).toBeVisible();
        await expect(dialog.getByText(/registros tuvieron errores\./i)).toBeVisible();

        // 6) Descargar detalle de errores y validar nombre de fichero
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            dialog.getByRole('button', { name: 'Descargar Detalle CSV' }).click(),
        ]);
        expect(download.suggestedFilename()).toBe('resultado_carga_masiva_localidades.csv');

        // 7) Cerrar diálogo y verificar regreso a Localidades
        await dialog.getByRole('button', { name: 'Cerrar' }).click();
        await expect(page).toHaveURL(/\/localidades$/);
        await expect(page.getByRole('heading', { name: 'Localidades' })).toBeVisible();
    });
});
