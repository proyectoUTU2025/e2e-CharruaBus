import { test, expect } from '@playwright/test';

test('Test Case 3: Token expirado o inválido', async ({ page }) => {

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

  //6.Ingresar un correo registrado
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('cliente_extra3@test.com');
 
  //7.Pulsar “Enviar código”
  await page.getByRole('button', { name: 'Enviar código' }).click();

  //8.Verificar que se muestra mensaje de confirmación del envío del correo
  //9.Ingresar el codigo de verificación
  await page.locator('.digit-input').first().fill('8');
  await page.locator('input:nth-child(2)').fill('9');
  await page.locator('input:nth-child(3)').fill('0');
  await page.locator('input:nth-child(4)').fill('5');
  await page.locator('input:nth-child(5)').fill('2');
  await page.locator('input:nth-child(6)').fill('0');

  //10.Presionar "Verificar Código" para verificar que el codigo sea valido
  await page.getByRole('button', { name: 'Verificar Código' }).click();

  //11.Verificar que se muestre un mensaje de error
  await expect(page.getByText('Código inválido.')).toBeVisible();
});