import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('CU 4.2 – Alta masiva de localidades', () => {
    test('TC1 – Alta masiva exitosa de localidades', async ({ page }) => {
        test.setTimeout(90_000);

        // 1) Login
        await page.goto(process.env.BASE_URL ?? 'http://localhost:4200/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Ir a Localidades
        await Promise.all([
            page.waitForURL('**/localidades'),
            page.locator('mat-toolbar').getByText(/Localidades/i).click(),
        ]);

        // 3) Abrir diálogo “Alta masiva”
        const altaMasivaBtn = page.getByRole('button', { name: /Alta Masiva/i }).first();
        await expect(altaMasivaBtn).toBeEnabled({ timeout: 20_000 });
        await altaMasivaBtn.click();

        // 4) Esperar diálogo abierto
        const dialog = page.locator('mat-dialog-container');
        await expect(dialog).toBeVisible({ timeout: 20_000 });

        // 5) Cargar CSV
        const csvPath = path.resolve(__dirname, '../../tests/fixtures/localidades/alta_valida.csv');
        await dialog.locator('input[type="file"]').setInputFiles(csvPath);

        // 6) Procesar y esperar “Proceso Finalizado”
        const procesarBtn = dialog.getByRole('button', { name: /Procesar Archivo/i });
        await expect(procesarBtn).toBeEnabled({ timeout: 20_000 });
        await procesarBtn.click();
        await expect(dialog.getByText(/Proceso Finalizado/i)).toBeVisible({ timeout: 60_000 });

        // 7) Verificar mensaje de éxito
        await expect(dialog.getByText(/localidades fueron creadas exitosamente/i))
            .toBeVisible();

        // 8) Cerrar y verificar navegación de regreso
        await dialog.getByRole('button', { name: /Cerrar/i }).click();
        await expect(page).toHaveURL(/\/localidades$/);
        await expect(page.getByRole('heading', { name: /Localidades/i })).toBeVisible();
    });
});
