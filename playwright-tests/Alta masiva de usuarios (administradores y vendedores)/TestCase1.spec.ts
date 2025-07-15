import path from 'path';
import { test, expect } from '@playwright/test';

test.describe('CU3.2 – Alta masiva de usuarios', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('adminTest@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Test1234!');
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();
        await page.getByRole('link', { name: 'Usuarios' }).click();
        await page.getByRole('button', { name: 'Alta masiva' }).click();
    });

    test('TC1: Carga masiva exitosa con CSV válido', async ({ page }) => {
        const csvPath = path.resolve(__dirname, '../fixtures/usuarios/alta_valida.csv');

        // Subir y procesar
        await page.getByLabel('Subir archivo CSV').setInputFiles(csvPath);
        await page.getByRole('button', { name: /procesar archivo/i }).click();

        // Verificaciones de éxito
        await expect(page.getByText(/\d+ registros en total/i)).toBeVisible();
        await expect(page.getByText(/\d+ usuarios creados/i)).toBeVisible();
        await expect(page.getByText(/operación completada con éxito/i)).toBeVisible();

        // **Validación de ausencia de errores**
        await expect(page.getByText(/registros tuvieron errores/i)).not.toBeVisible();

        // Cierra el diálogo
        await page.getByRole('button', { name: 'Cerrar' }).click();
    });
});
