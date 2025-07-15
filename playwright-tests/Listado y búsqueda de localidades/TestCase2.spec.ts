import { test, expect } from '@playwright/test';

test('test', async ({ page, browserName }) => {
    // Skip WebKit
    test.skip(browserName === 'webkit', 'Inestable o no soportado en WebKit');

    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('.mat-mdc-form-field-infix').first().click();
    await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
    await page.getByRole('textbox', { name: 'Contraseña' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('heading', { name: 'Localidades' }).click();
    await expect(page.getByRole('cell', { name: '3' })).toBeVisible();
    await page.getByRole('cell', { name: 'COLONIA', exact: true }).click();
    await expect(page.getByRole('cell', { name: 'COLONIA', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Colonia del Sacramento' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '2' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'MALDONADO' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Punta del Este' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '1' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'MONTEVIDEO' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Terminal Tres Cruces' })).toBeVisible();
});