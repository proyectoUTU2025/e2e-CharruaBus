import { test, expect } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:4200';

test.describe('CU 5.4 – Historial de notificaciones', () => {
    test('TC2 – Cerrar panel sin seleccionar notificaciones', async ({ page }) => {
        // 1) Login como cliente
        await page.goto(BASE);
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('cliente@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Abrir panel de Notificaciones
        await page.getByRole('button', { name: /Notificaciones/i }).click();
        const startURL = page.url();

        // 3) Cerrar el panel
        await page.getByRole('button', { name: /Cerrar/i }).click();

        // 4) Verificar que no hubo redirección
        await expect(page).toHaveURL(startURL);
    });
});
