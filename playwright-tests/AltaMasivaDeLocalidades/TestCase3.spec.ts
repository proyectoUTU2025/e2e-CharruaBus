import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('CU 4.2 – Alta masiva de localidades', () => {
    test('TC3 – Error por CSV mal formado en Alta Masiva de Localidades', async ({ page }) => {
        // 1 minuto de timeout para la prueba completa
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

        // 2) Navegar a Localidades
        await Promise.all([
            page.waitForURL('**/localidades'),
            page.locator('mat-toolbar').getByRole('link', { name: 'Localidades' }).click(),
        ]);

        // 3) Abrir diálogo “Alta Masiva”
        const altaMasivaBtn = page.getByRole('button', { name: 'Alta Masiva' }).first();
        await altaMasivaBtn.waitFor({ state: 'visible', timeout: 10_000 });
        await altaMasivaBtn.click();

        // 4) Esperar al diálogo de carga
        await page.waitForSelector('mat-dialog-container[role="dialog"]', { timeout: 20_000 });

        // 5) Subir CSV mal formado
        const csvPath = path.resolve(__dirname, '../../tests/fixtures/localidades/alta_mal_formada.csv');
        await page.locator('input[type="file"]').setInputFiles(csvPath);

        // 6) Procesar y esperar el error
        const dialog = page.locator('mat-dialog-container').last();
        await Promise.all([
            dialog.getByRole('heading', { name: 'Error en el archivo CSV' }).waitFor({ timeout: 20_000 }),
            page.getByRole('button', { name: 'Procesar Archivo' }).click(),
        ]);

        // 7) Validar mensajes de error
        await expect(dialog.getByRole('heading', { name: 'Error en el archivo CSV' })).toBeVisible();
        await expect(dialog.getByText(/Asegúrese de que las columnas/i)).toBeVisible();
        await expect(dialog.getByText(/nombre\s*,\s*departamento/i)).toBeVisible(); // acepta con o sin espacio tras la coma
        await expect(dialog.getByText(/no pudo ser procesado/i)).toBeVisible();

        // 8) Cerrar diálogo de error
        await dialog.getByRole('button', { name: 'Cerrar' }).click();

        // 9) Verificar retorno a la pantalla de Localidades
        await expect(page).toHaveURL(/\/localidades$/);
        await expect(page.getByRole('heading', { name: 'Localidades' })).toBeVisible();
    });
});
