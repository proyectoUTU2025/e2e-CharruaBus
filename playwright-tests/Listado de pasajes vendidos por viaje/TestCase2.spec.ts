import { test, expect } from '@playwright/test';

test(' Test Case 2: No hay pasajes vendidos para el viaje seleccionado', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vendedor12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Seleccionar "Viajes" de la barra de navegación
  await page.locator('mat-toolbar').getByRole('link', { name: 'Viajes' }).click();

  //6.Seleccionar un viaje que se sabe no tiene pasajes vendidos y acceder al menú "Historial de pasajes
  await page.getByRole('row', { name: '3 SALTO - Salto FLORIDA -' }).getByRole('button').click();
  await page.getByText('history Historial de Pasajes').click();

  //7.Verificar que se muestra el mensaje: "No hay pasajes para mostrar"
  await page.getByText('inboxNo hay pasajes para').click();
});