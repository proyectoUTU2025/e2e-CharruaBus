import path from 'path';
import { test, expect } from '@playwright/test';

test.describe('CU 3.2 – Alta masiva de usuarios', () => {
    test.beforeEach(async ({ page }) => {
        // 1) Login como administrador
        await page.goto('/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('adminTest@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Test1234!');
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();

        // 2) Navegar a Usuarios → Alta masiva
        await page.getByRole('link', { name: 'Usuarios' }).click();
        await page.getByRole('button', { name: 'Alta masiva' }).click();
    });

    test('TC2: CSV con filas inválidas o duplicados', async ({ page }) => {
        const csvPath = path.resolve(__dirname, '../fixtures/usuarios/alta_con_errores.csv');

        // 3) Subir archivo con errores y procesar
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles(csvPath);
        await page.getByRole('button', { name: /procesar archivo/i }).click();

        // 4) Verificar que carga sólo filas válidas y reporta las inválidas
        await expect(page.getByText(/\d+ registros en total/i)).toBeVisible();
        await expect(page.getByText(/filas ignoradas: \d+/i)).toBeVisible();
        // Ejemplos de mensajes por fila
        await expect(page.getByText(/Error fila 2: campo requerido/i)).toBeVisible();
        await expect(page.getByText(/Error fila 4: tipo documento inválido/i)).toBeVisible();
        await expect(page.getByText(/filas duplicadas: \d+/i)).toBeVisible();

        // 5) Descargar el detalle de errores
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByRole('button', { name: /descargar detalle csv/i }).click(),
        ]);
        // Verifica que el nombre del archivo coincide con el detalle de errores
        expect(download.suggestedFilename()).toMatch(/detalle_errores.*\.csv$/i);

        // 6) Cerrar diálogo
        await page.getByRole('button', { name: /cerrar/i }).click();
    });
});
