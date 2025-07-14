// tests/stats/cu_3_5/TC2_parametros_invalidos.spec.ts
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

    test('TC2: Parámetros inválidos o incompletos', async ({ page }) => {
        // Selecciono la estadística que requiere rango de fechas
        await page.getByRole('menuitem', { name: 'Logueos' }).click();

        // Pulso sin completar ningún parámetro
        await page.getByRole('button', { name: 'Buscar' }).click();

        // Verificar que se muestra error por campos faltantes
        await expect(
            page.getByText(/complete los campos obligatorios/i)
        ).toBeVisible();
    });
});
