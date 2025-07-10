import { test, expect } from '@playwright/test';

test('Test Case 3: Búsqueda con filtros parciales', async ({ page }) => {

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

  //7.Ingresar solo un filtro


  //8.Pulsar “Buscar”
  await page.getByRole('button', { name: 'Buscar' }).click();

  //9.Verificar que se muestran los resultados correspondientes según el filtro ingresado
  await expect(page.locator('div').filter({ hasText: 'directions_busNo se' }).nth(2)).toBeVisible();
  await expect(page.getByText('No hay viajes que coincidan')).toBeVisible();
});