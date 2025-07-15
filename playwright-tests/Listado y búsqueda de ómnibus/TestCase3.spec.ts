import { test, expect } from '@playwright/test';

test('Test Case 3: No hay coincidencias con los filtros aplicados', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación  
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();
 
  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Acceder al módulo de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

  //6.Aplicar un conjunto de filtros que, se sabe, no arrojarán ningún resultado
  await page.getByRole('combobox', { name: 'Ubicación del Ómnibus' }).locator('svg').click();
  await page.getByRole('option', { name: 'MALDONADO - Punta del Este', exact: true }).click();
  await page.getByText('Max. Asientos').click();
  await page.getByRole('spinbutton', { name: 'Max. Asientos' }).fill('1');
  await page.locator('mat-form-field').filter({ hasText: 'Fecha SalidaRequerida si' }).getByLabel('Open calendar').click();
  await page.getByRole('button', { name: '17 de julio de' }).click();
  await page.locator('mat-form-field').filter({ hasText: 'Fecha LlegadaRequerida si' }).getByLabel('Open calendar').click();
  await page.getByRole('button', { name: '18 de julio de' }).click();

  //7.Pulsar "Buscar"
  await page.getByRole('button', { name: 'Buscar' }).click();

  //8.Verificar que el sistema informa que no hay resultados que coincidan con los filtros ingresados.
  await expect(page.locator('div').filter({ hasText: 'directions_bus_filledNo se' }).nth(2)).toBeVisible();
});