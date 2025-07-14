import { test, expect } from '@playwright/test';

test('Test Case 1: Búsqueda exitosa con múltiples filtros', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vendedor12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
 
  //5.Acceder al módulo de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

  //6.Aplicar una combinación de filtros
  await page.getByText('Max. Asientos').click();
  await page.getByRole('spinbutton', { name: 'Min. Asientos' }).fill('60');

  //7.Pulsar "Buscar"
  await page.getByRole('button', { name: 'Buscar' }).click();

  //8.Verificar que el sistema muestra un listado de ómnibus que coinciden exactamente con todos los criterios de filtro aplicados
  const cellWith60Locator = page.getByRole("cell", { name: "60" })
  await expect(cellWith60Locator.first()).toBeVisible({ timeout: 15000 })
  const cellsWith60 = await cellWith60Locator.all()

  await expect(cellsWith60.length).toBeGreaterThan(0);


});