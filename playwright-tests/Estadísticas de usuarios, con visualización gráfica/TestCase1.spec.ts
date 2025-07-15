import { test, expect } from '@playwright/test';

test('Test Case 1: Visualización y descarga exitosa de estadísticas', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación    
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();
 
  //4.Iniciar sesión como administrador
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Admin123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Acceder a la sección “Estadísticas”
  await page.locator('mat-toolbar').getByRole('button', { name: 'Estadísticas' }).click();

  //6.Seleccionar un tipo de estadística
  await page.getByRole('menuitem', { name: 'Usuarios' }).click();

  //7.Seleccionar opción “Descargar CSV” o “Descargar PDF”
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'PDF' }).click();
  const page1 = await page1Promise;
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'CSV' }).click();
  const download = await downloadPromise;
});