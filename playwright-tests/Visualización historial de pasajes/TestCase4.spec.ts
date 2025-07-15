import { test, expect } from '@playwright/test';

test('Test Case 4: No hay pasajes que coincidan con los filtros aplicados', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación    
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como cliente
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('cliente_extra2@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Seleccionar la opción "Mis pasajes" en la interfaz
  await page.getByText('historyMis PasajesVer').click();

  //6.Aplicar filtros que se sabe que no arrojarán ningún resultado 
  await page.getByRole('combobox', { name: 'Origen' }).locator('svg').click();
  await page.getByText('MALDONADO - Punta del Este').click();

  //7.Presionar "Buscar"
  await page.getByRole('button', { name: 'Buscar' }).click();

  //8.Verificar que se muestra el mensaje "No se encontraron compras que coincidan con los filtros"
  await page.getByText('search_offNo se encontraron').click();
});