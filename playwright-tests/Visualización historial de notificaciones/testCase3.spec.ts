import { test, expect } from '@playwright/test';

test('Test Case 3: Cliente sin notificaciones recibidas', async ({ page }) => {

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

  //5.Seleccionar la opción de "Notificaciones" desde el menú del Cliente
  await page.locator('mat-toolbar').getByText('notifications Notificaciones').click();

  //6.Verificar que el sistema muestra un mensaje indicando que no hay notificaciones
  await page.getByText('notifications_noneNo tienes').click();
});