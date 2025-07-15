import { test, expect } from '@playwright/test';

test('test', async ({ page, browserName }) => {
    // Skip Chromium y WebKit
    test.skip(browserName === 'chromium' || browserName === 'webkit', 'Inestable o no soportado en Chromium/WebKit');

    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('.mat-mdc-form-field-infix').first().click();
    await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
    await page.getByText('Contraseña', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByText('location_cityLocalidadesGestionar localidadesarrow_forward').click();
    await expect(page.getByRole('cell', { name: '3' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'COLONIA', exact: true })).toBeVisible();
    await page.getByRole('cell', { name: 'Colonia del Sacramento' }).click();
    await page.getByRole('combobox', { name: 'Departamento' }).locator('span').click();
    await page.getByRole('option', { name: 'COLONIA' }).click();
    await page.getByRole('button', { name: 'Buscar' }).click();
    await expect(page.getByRole('cell', { name: '3' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'COLONIA', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Colonia del Sacramento' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Nombre' }).click();
    await page.getByRole('textbox', { name: 'Nombre' }).fill('colonia');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await expect(page.getByRole('cell', { name: 'Colonia del Sacramento' })).toBeVisible();
    await page.getByRole('button', { name: 'Departamento' }).click();
    await page.getByRole('button', { name: 'Departamento' }).click();
    await expect(page.getByRole('cell', { name: '3' })).toBeVisible();
    await page.getByRole('cell', { name: 'COLONIA', exact: true }).click();
});
