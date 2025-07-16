import { test, expect } from '@playwright/test';

test('test compra de pasaje sin exito porque no hay viajes que coincidan con lo buscado', async ({ page, browserName }) => {
    // Skip the test for webkit and chromium browsers
    if (browserName === 'webkit' || browserName === 'chromium') {
        test.skip();
    }

    await page.goto('http://localhost:4200/');
    await page.locator('body').click();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByText('Email').click();
    await page.getByRole('textbox', { name: 'Email' }).fill('cliente@e2e.test');
    await page.getByRole('textbox', { name: 'Contraseña' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByText('shopping_cartComprar Pasajes').click();
    await page.getByRole('combobox', { name: 'Origen' }).locator('svg').click();
    await page.getByRole('option', { name: 'MONTEVIDEO - Terminal Tres' }).click();
    await page.getByRole('combobox', { name: 'Destino' }).locator('svg').click();
    await page.getByText('MALDONADO - Punta del Este').click();
    await page.getByRole('button', { name: 'Open calendar' }).click();
    await page.getByRole('button', { name: '18 de julio de' }).click();
    await page.getByRole('button', { name: 'Buscar' }).click();
    await expect(page.getByText('No hay viajes que coincidan')).toBeVisible();
});