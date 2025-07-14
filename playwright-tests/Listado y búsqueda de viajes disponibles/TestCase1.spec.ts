import { test, expect } from '@playwright/test';

test(' Test Case 1: Búsqueda de viajes con filtros válidos', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Ingresar un email y contraseña válidos (vendedor o cliente)
  await page.locator('.mat-mdc-form-field-infix').first().click();
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vendedor12!');

  //5.Pulsar "Iniciar sesión"
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //6.Ir a la página principal y hacer clic en “Viajes”
  await page.locator('mat-toolbar').getByRole('link', { name: 'Viajes' }).click();

  //7.Ingresar filtros válidos: Origen, Destino y Fecha de salida
  await page.getByRole('combobox', { name: 'Origen' }).locator('svg').click();
  await page.getByRole('option', { name: 'SALTO - Salto' }).click();

  //8.Pulsar “Buscar”
  await page.getByRole('button', { name: 'Buscar' }).click();

  //9.Verificar que se muestren los resultados de la búsqueda
  const cellLocator = page.getByRole('cell', { name: 'SALTO - Salto' })
  await expect(cellLocator.first()).toBeVisible({ timeout: 15000 })
  const cells = await cellLocator.all()

  await expect(cells.length).toBeGreaterThan(0);
  
});