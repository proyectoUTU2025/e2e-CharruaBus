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

    test('TC3: Error por encabezados incorrectos o faltantes', async ({ page }) => {
        const csvPath = path.resolve(__dirname, '../fixtures/usuarios/alta_mal_formada.csv');

        // 3) Subir CSV mal formado y procesar
        await page.getByLabel('Subir archivo CSV').setInputFiles(csvPath);
        await page.getByRole('button', { name: /procesar archivo/i }).click();

        // 4) Verificar encabezado de error
        await expect(page.getByRole('heading', { name: /Error en el archivo CSV/i })).toBeVisible();

        // 5) Verificar mensajes de detalle
        await expect(page.getByText(/Asegúrese de que las columnas email, contraseña, nombre, apellido, fechaNacimiento, documento, tipoDocumento y rol estén presentes/i)).toBeVisible();
        await expect(page.getByText(/El archivo no pudo ser procesado debido a encabezados inválidos/i)).toBeVisible();

        // 6) Verificar botón para volver atrás
        const volverBtn = page.getByRole('button', { name: /volver/i });
        await expect(volverBtn).toBeVisible();
        await volverBtn.click();

        // 7) Confirmar que retorna al paso de selección de archivo
        await expect(page.getByLabel('Subir archivo CSV')).toBeVisible();
    });
});
