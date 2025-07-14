import { test, expect } from '@playwright/test';

test('Test Case 3: Cliente sin pasajes comprados (sin compras registradas)', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación  
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como cliente
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('gameftjp@gmail.com');
  await page.locator('#mat-mdc-form-field-label-1 span').click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Pepito12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Seleccionar la opción "Mis pasajes" en la interfaz
  await page.getByText('historyMis PasajesVer').click();

  //6.Verificar que se muestra el mensaje "No se encontraron compras que coincidan con los filtros"
  await page.getByText('search_offNo se encontraron').click();
});