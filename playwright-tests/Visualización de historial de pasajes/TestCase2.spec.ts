import { test, expect } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'http://localhost:4200';

test.describe('CU 5.3 – Historial de pasajes (sin resultados)', () => {
    test('TC2 – No hay pasajes registrados', async ({ page }) => {
        // 1) Login como cliente sin pasajes
        await page.goto(baseURL);
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('sinpasajes@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('NoPas123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Acceder a “Mis pasajes”
        await Promise.all([
            page.waitForURL('**/mis-pasajes'),
            page.getByRole('link', { name: 'Mis pasajes' }).click(),
        ]);

        // 3) Verificar mensaje de no resultados
        await expect(
            page.getByText('No se encontraron compras que coincidan con los filtros')
        ).toBeVisible();
    });
});
