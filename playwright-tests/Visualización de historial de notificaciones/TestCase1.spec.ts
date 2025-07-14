import { test, expect } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:4200';

test.describe('CU 5.4 – Historial de notificaciones', () => {
    test('TC1 – Visualización de historial de notificaciones', async ({ page }) => {
        test.setTimeout(60_000);

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

        // 3) Verificar que se listan notificaciones
        const items = page.locator('mat-drawer mat-list-item');
        await expect(items).toHaveCountGreaterThan(0);

        // 4) (Opcional) comprobar que marcaron como vistas
        // e.g. ningún item muestra aun badge de "no leído"
        await expect(page.locator('mat-drawer mat-list-item .unread-badge')).toHaveCount(0);

        // 5) Seleccionar la primera notificación
        await items.first().click();

        // 6) Validar redirección al detalle de compra
        await page.waitForURL('**/compras/**');
        await expect(page.getByRole('heading', { name: /Detalle de Compra/i })).toBeVisible();
    });
});
