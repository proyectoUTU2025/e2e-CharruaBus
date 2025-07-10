import { test, expect } from '@playwright/test';

test('Test Case 3: Login con contraseña incorrecta', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación
  await page.goto('http://localhost:4200/');

  //3.Verificar que se muestre el boton de login
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

  //4.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //5.Verificar que se muestre el formulario de login con campos "Email" y "Contraseña"
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Contraseña' })).toBeVisible();

  //6.Ingresar un email registrado
  await page.getByText('Email').click();
  await page.getByRole('textbox', { name: 'Email' }).fill('gameftjp@gmail.com');

  //7.Ingresar una contraseña incorrecta
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('pass');

  //8.Pulsar "Iniciar sesión"
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //9.Verificar que se muestre un mensaje de error
  await expect(page.getByText('Credenciales inválidas')).toBeVisible();
});