import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('CU 2.2 – Compra de pasajes', () => {
    test('TC1 – Compra de pasaje solo de ida exitosa', async ({ page }) => {
        test.setTimeout(120_000);

        // 1) Login como vendedor
        await page.goto(process.env.BASE_URL || 'http://localhost:4200');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vendedorTest@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Test1234!');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Ir a “Comprar pasaje”
        await Promise.all([
            page.waitForURL('**/comprar'),
            page.locator('mat-toolbar').getByRole('link', { name: 'Comprar' }).click(),
        ]);

        // 3) Rellenar filtros (solo ida)
        await page.getByRole('combobox', { name: 'Origen' }).click();
        await page.getByRole('option', { name: 'MONTEVIDEO - Terminal Tres Cruces' }).click();
        await page.getByRole('combobox', { name: 'Destino' }).click();
        await page.getByRole('option', { name: 'MALDONADO - Punta del Este' }).click();
        await page.getByRole('button', { name: 'Open calendar' }).click();
        await page.getByRole('button', { name: '10 de julio de 2025' }).click();

        // 4) Buscar
        await Promise.all([
            page.waitForResponse('**/api/viajes?**'),
            page.getByRole('button', { name: 'Buscar' }).click(),
        ]);

        // 5) Seleccionar viaje y asiento
        await page.locator('.viaje-item').first().click();
        await page.locator('mat-icon', { hasText: 'event_seat' }).first().click();
        await page.getByRole('button', { name: 'Siguiente' }).click();

        // 6) Confirmar pasajero (vendedor)
        await page.getByRole('combobox', { name: 'Buscar cliente por correo o' }).fill('cliente@test.com');
        await page.getByRole('option', { name: 'Cliente Test - cliente@test.com' }).click();
        await page.getByRole('button', { name: 'Siguiente' }).click();

        // 7) Confirmar y redirigir a Stripe
        await Promise.all([
            page.waitForURL(/stripe/),
            page.getByRole('button', { name: 'Confirmar y Pagar' }).click(),
        ]);

        // 8) Simular éxito y validar mensaje
        // (asumimos que al volver queda un mensaje de thanks)
        await expect(page.getByText(/gracias por tu compra/i)).toBeVisible();

        // 9) Notificación (snackbar o panel)
        await expect(page.getByText(/Notificación de compra/i)).toBeVisible();
    });
});
