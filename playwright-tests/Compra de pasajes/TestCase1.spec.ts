import { test, expect } from '@playwright/test';

test('test compra de pasaje exitosa', async ({ page, browserName }) => {
    if (browserName === 'webkit' || browserName === 'chromium') {
        test.skip();
    }

    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('.mat-mdc-form-field-infix').first().click();
    await page.getByRole('textbox', { name: 'Email' }).fill('cliente@e2e.test');
    await page.locator('.mat-mdc-form-field.mat-mdc-form-field-type-mat-input.mat-mdc-form-field-has-icon-suffix > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('heading', { name: 'Comprar Pasajes' }).click();
    await page.getByText('Tipo de ViajeSOLO IDAOrigenDestinoPasajeros1Fecha Ida').click();
    await page.getByRole('combobox', { name: 'Origen' }).locator('span').click();
    await page.getByText('MONTEVIDEO - Terminal Tres').click();
    await page.getByRole('combobox', { name: 'Destino' }).locator('svg').click();
    await page.getByText('MALDONADO - Punta del Este').click();
    await page.getByRole('button', { name: 'Open calendar' }).click();
    await page.getByRole('button', { name: '16 de julio de' }).click();
    await page.getByRole('button', { name: 'Buscar' }).click();
    await page.locator('.viaje-item').click();
    await page.getByRole('button', { name: 'Siguiente', exact: true }).click();
    await page.locator('div').filter({ hasText: /^event_seat1$/ }).locator('mat-icon').click();
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.getByRole('button', { name: 'Confirmar y Pagar' }).click();
    await page.getByRole('textbox', { name: 'Card number' }).click();
    await page.getByRole('textbox', { name: 'Card number' }).fill(' 4242 4242 4242 4242');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('client@test.com');
    await page.getByRole('textbox', { name: 'Expiration' }).click();
    await page.getByRole('textbox', { name: 'Expiration' }).fill('01 / 26');
    await page.getByRole('textbox', { name: 'CVC' }).click();
    await page.getByRole('textbox', { name: 'CVC' }).fill('333');
    await page.getByRole('textbox', { name: 'Cardholder name' }).click();
    await page.getByRole('textbox', { name: 'Cardholder name' }).fill('client test');
    await page.getByTestId('hosted-payment-submit-button').click();
    await page.goto('http://localhost:4200/compra/1?source=purchase&status=success');
    await expect(page.getByText('¡Compra Realizada con Éxito!')).toBeVisible();
});