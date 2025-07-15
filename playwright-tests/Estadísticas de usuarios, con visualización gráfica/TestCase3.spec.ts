// tests/stats/cu_3_5/TC3_sin_datos.spec.ts
import { test, expect } from '@playwright/test';

test.describe('CU 3.5 – Estadísticas de usuarios', () => {
    test.beforeEach(async ({ page }) => {
        // Login como administrador
        await page.goto('/');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('admin');
        await page.getByRole('button', { name: 'Iniciar sesión' }).click();

        // Ir a Estadísticas → Usuarios
        await page.locator('mat-toolbar').getByRole('button', { name: 'Estadísticas' }).click();
        await page.getByRole('menuitem', { name: 'Usuarios' }).click();
    });

    test('TC3: No hay datos disponibles para el rango indicado', async ({ page }) => {
        // Selecciono la estadística de Logueos
        await page.getByRole('menuitem', { name: 'Logueos' }).click();

        // Ingreso un rango donde no hay registros
        await page.getByLabel('Fecha inicio').fill('2000-01-01');
        await page.getByLabel('Fecha fin').fill('2000-01-02');

        // Generar
        await page.getByRole('button', { name: 'Buscar' }).click();

        // Verificar mensaje de "sin datos"
        await expect(
            page.getByText(/No hay datos disponibles para la estadística solicitada/i)
        ).toBeVisible();
    });
});
