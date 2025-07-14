import { test, expect } from '@playwright/test';

test('Test Case 2: Correo no registrado', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación 
  await page.goto('http://localhost:4200/');

  //3.Verificar que se muestre el boton de login
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

  //4.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //5.Hacer clic en “¿Olvidó su contraseña?”
  await expect(page.getByText('¿Olvidaste tu contraseña?')).toBeVisible();
  await page.getByText('¿Olvidaste tu contraseña?').click();

  //6.Ingresar un correo no registrado
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('correo1@gmail.com');
 
  //7.Pulsar “Enviar código”
  await page.getByRole('button', { name: 'Enviar código' }).click();

  //8.Verificar que se muestre un mensaje de error
  await expect(page.getByText('El correo ingresado no existe')).toBeVisible();
});