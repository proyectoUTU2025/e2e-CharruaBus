import { test, expect } from '@playwright/test';

test('test', async ({ page, browserName }) => {
    // Skip on Chromium and WebKit until flakiness is resolved
    test.skip(browserName === 'chromium' || browserName === 'webkit', 'Skipping unstable browsers');

    // 1) Navegar al home y loguearse
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('cliente_extra3@test.com');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // 2) Ir a “Comprar pasajes”
    await page.getByText('shopping_cartComprar Pasajes').click();

    // 3) Abrir calendario y escoger fecha
    await page.getByRole('button', { name: 'Open calendar' }).click();
    await page.getByRole('button', { name: '19 de julio de' }).click();

    // 4) Seleccionar origen y destino
    await page.getByRole('combobox', { name: 'Origen' }).locator('span').click();
    await page.getByRole('option', { name: 'MONTEVIDEO - Terminal Tres' }).click();
    await page.getByRole('combobox', { name: 'Destino' }).locator('span').click();
    await page.getByText('MALDONADO - Punta del Este').click();

    // 5) Buscar
    await page.getByRole('button', { name: 'Buscar' }).click();

    // 6) Verificar mensajes de “no viajes”
    await expect(page.getByRole('heading', { name: 'No se encontraron viajes' })).toBeVisible();
    await expect(page.getByText('No hay viajes que coincidan')).toBeVisible();
});
