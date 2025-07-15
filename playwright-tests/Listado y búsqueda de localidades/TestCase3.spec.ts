import { test, expect } from '@playwright/test';

test('test', async ({ page, browserName }) => {
    //Skipp chromium
    test.skip(browserName === 'chromium', 'Inestable o no soportado en Chromium');

    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('.mat-mdc-form-field-subscript-wrapper').first().click();
    await page.locator('.mat-mdc-form-field-infix').first().click();
    await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
    await page.getByText('Contraseña', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
    await page.getByText('EmailContraseña').click();
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByText('location_cityLocalidadesGestionar localidadesarrow_forward').click();
    await page.getByRole('combobox', { name: 'Departamento' }).locator('span').click();
    await page.getByRole('option', { name: 'SORIANO' }).click();
    await page.getByRole('button', { name: 'Buscar' }).click();
    await expect(page.getByRole('heading', { name: 'No se encontraron localidades' })).toBeVisible();
    await expect(page.getByText('No hay localidades que')).toBeVisible();
});