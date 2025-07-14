import { test, expect } from '@playwright/test';

test.describe('CU 2.2 – Compra de pasajes', () => {
    test('TC4 – Usuario cancela antes de pagar', async ({ page }) => {
        test.setTimeout(90_000);

        // 1–4) Mismos pasos que TC1 hasta redirección a Stripe
        await page.goto(process.env.BASE_URL || 'http://localhost:4200');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('cliente@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        await Promise.all([
            page.waitForURL('**/comprar'),
            page.locator('mat-toolbar').getByRole('link', { name: 'Comprar' }).click(),
        ]);

        // ... rellenar filtros, buscar, elegir viaje, asiento, pasajero ...
        // Para abreviar, los mismos selectores de TC1/2 hasta:
        await page.getByRole('button', { name: 'Confirmar y Pagar' }).click();
        await page.waitForURL(/stripe/);

        // 5) Cancelar Stripe simulando “cerrar la ventana”
        await page.goBack();  // regresamos al checkout de CharruaBus

        // 6) Verificar que no hay compra registrada en la lista de pasajes
        await Promise.all([
            page.waitForURL('**/mis-pasajes'),
            page.locator('mat-toolbar').getByRole('link', { name: 'Mis pasajes' }).click(),
        ]);
        await expect(page.getByText(/No se encontraron/i)).toBeVisible();
    });
});
