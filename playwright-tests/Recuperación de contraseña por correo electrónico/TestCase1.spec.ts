import { test, expect } from '@playwright/test';

test('Test Case 1: Recuperación de contraseña exitosa', async ({ page }) => {
   
  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Verificar que se muestre el boton de login
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

  //4.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //5.Hacer clic en “¿Olvidó su contraseña?”
  await page.getByText('¿Olvidaste tu contraseña?').click();
  await expect(page.getByRole('heading', { name: 'Recuperar Contraseña' })).toBeVisible();

  //6.Ingresar un correo válido y registrado
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('gameftjp@gmail.com');

  //7.Pulsar “Enviar código”
  await page.getByRole('button', { name: 'Enviar código' }).click();

  //8.Verificar que se muestra mensaje de confirmación del envío del correo
  //9.Ingresar el codigo de verificación
  await page.pause();

  //10.Presionar "Verificar Código" para verificar que el codigo sea valido
  await page.getByRole('button', { name: 'Verificar Código' }).click();
  await expect(page.getByText('Código válido. Ya puedes')).toBeVisible();

  //11.Ingresar una nueva contraseña y su confirmación
  await page.getByText('Nueva Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Nueva Contraseña' }).fill('Pepito12!');
  await page.getByText('Confirmar Contraseña').click();
  await page.getByRole('textbox', { name: 'Confirmar Contraseña' }).fill('Pepito12!');
 
  //12.Presiona "Cambiar Contraseña"
  await page.getByRole('button', { name: 'Cambiar Contraseña' }).click();

  //13.Ingresa con la nueva contraseña
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('gameftjp@gmail.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Pepito12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //14.Verificar que el usuario sea redirigido a la pantalla principal según su rol
  await expect(page.locator('#mat-mdc-chip-0').getByText('CLIENTE')).toBeVisible();
  await expect(page.getByText('CharruaBus CLIENTE')).toBeVisible();

});