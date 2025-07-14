import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('CU 4.2 – Alta masiva de localidades', () => {
    test('TC1 – Alta masiva exitosa de localidades', async ({ page }) => {
        test.setTimeout(60_000);

        // 1) Login
        await page.goto(process.env.BASE_URL || 'http://localhost:4200/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vendedorTest@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Test1234!');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Ir a Localidades via toolbar text
        await Promise.all([
            page.waitForURL('**/localidades'),
            page.locator('mat-toolbar').getByText('Localidades').click(),
        ]);

        // 3) Abrir diálogo “Alta Masiva”
        const altaMasiva = page.getByRole('button', { name: 'Alta Masiva' }).first();
        await altaMasiva.waitFor({ state: 'visible' });
        await altaMasiva.click();

        // 4) Espera explícita al diálogo (más robusto para WebKit)
        await page.waitForSelector('mat-dialog-container', { timeout: 20_000 });

        // 5) Cargar CSV
        const csvPath = path.resolve(
            __dirname,
            '../../tests/fixtures/localidades/alta_valida.csv'
        );
        await page.setInputFiles('input[type="file"]', csvPath);

        // 6) Procesar y esperar “Proceso Finalizado”
        await Promise.all([
            page.waitForSelector('text=Proceso Finalizado', { timeout: 30_000 }),
            page.getByRole('button', { name: 'Procesar Archivo' }).click(),
        ]);

        // 7) Verificar mensaje de éxito
        const dialog = page.locator('mat-dialog-container').last();
        await expect(
            dialog.getByText(/localidades fueron creadas exitosamente/i)
        ).toBeVisible();

        // 8) Cerrar y verificar navegación de regreso
        await dialog.getByRole('button', { name: 'Cerrar' }).click();
        await expect(page).toHaveURL(/\/localidades$/);
        await expect(page.getByRole('heading', { name: 'Localidades' })).toBeVisible();
    });
});
