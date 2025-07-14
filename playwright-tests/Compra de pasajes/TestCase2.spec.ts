import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('CU 2.2 – Compra de pasajes', () => {
    test('TC2 – Compra de pasaje ida y vuelta exitosa', async ({ page }) => {
        test.setTimeout(150_000);

        // 1) Login
        await page.goto(process.env.BASE_URL || 'http://localhost:4200');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('cliente@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Ir a “Comprar pasaje”
        await Promise.all([
            page.waitForURL('**/comprar'),
            page.locator('mat-toolbar').getByRole('link', { name: 'Comprar' }).click(),
        ]);

        // 3) Seleccionar “Ida y vuelta”
        await page.getByRole('radio', { name: 'Ida y vuelta' }).click();

        // 4) Rellenar filtros de ida y vuelta
        await page.getByRole('combobox', { name: 'Origen' }).click();
        await page.getByRole('option', { name: 'MONTEVIDEO - Terminal Tres Cruces' }).click();
        await page.getByRole('combobox', { name: 'Destino' }).click();
        await page.getByRole('option', { name: 'MALDONADO - Punta del Este' }).click();

        await page.getByRole('button', { name: 'Open calendar' }).click();
        await page.getByRole('button', { name: '10 de julio de 2025' }).click();
        // Salto al selector de vuelta
        await page.getByRole('button', { name: 'Open return calendar' }).click();
        await page.getByRole('button', { name: '12 de julio de 2025' }).click();

        // 5) Buscar
        await Promise.all([
            page.waitForResponse('**/api/viajes?**'),
            page.getByRole('button', { name: 'Buscar' }).click(),
        ]);

        // 6) Seleccionar ida y vuelta
        const viajes = page.locator('.viaje-item');
        await viajes.nth(0).click(); // ida
        await viajes.nth(1).click(); // vuelta
        await page.getByRole('button', { name: 'Siguiente' }).click();

        // 7) Seleccionar asientos en ida y vuelta
        const asientos = page.locator('mat-icon', { hasText: 'event_seat' });
        await asientos.nth(0).click();
        await asientos.nth(1).click();
        await page.getByRole('button', { name: 'Siguiente' }).click();

        // 8) Confirmar pasajero (cliente)
        await page.getByRole('button', { name: 'Siguiente' }).click();

        // 9) Confirmar y pagar
        await Promise.all([
            page.waitForURL(/stripe/),
            page.getByRole('button', { name: 'Confirmar y Pagar' }).click(),
        ]);

        // 10) Validar éxito y detalle de 2 pasajes
        await expect(page.getByText(/gracias por tu compra/i)).toBeVisible();
        await expect(page.getByText(/2 pasajes/i)).toBeVisible();
    });
});
