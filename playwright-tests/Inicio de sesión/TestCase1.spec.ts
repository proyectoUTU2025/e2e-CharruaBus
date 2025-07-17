import { test, expect } from '@playwright/test';

test('Test Case 1: Login con credenciales válidas', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación 
  await page.goto('http://localhost:4200/');

  //3.Verificar que se muestre el boton de login
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  
  //4.Presiona el boton de login
  await page.getByRole('link', { name: 'Login' }).click();

  //5.Verificar que se muestre el formulario de login con campos "Email" y "Contraseña"
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Contraseña' })).toBeVisible();
 
  //6.Ingresar un email y contraseña válidos
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('cliente@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');

  //7.Pulsar el botón "Iniciar sesión"
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //8.Verificar que el usuario sea redirigido a la pantalla principal según su rol
  await expect(page.locator('#mat-mdc-chip-0').getByText('CLIENTE')).toBeVisible();
});