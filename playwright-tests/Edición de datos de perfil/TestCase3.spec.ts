import { test, expect } from '@playwright/test';

test('Test Case 3: Ingreso de datos inválidos por el cliente/vendedor', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Ingresar un email y contraseña válidos (vendedor o cliente)
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vendedor12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Navegar a la sección "Mi perfil"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();

  //6.Ingresar datos que no cumplen las validaciones
  await page.getByRole('textbox', { name: 'Apellido' }).click();
  await page.getByRole('textbox', { name: 'Apellido' }).fill('');
  await page.locator('mat-card').filter({ hasText: 'account_circleInformación' }).click();

  //7.Verificar que se muestran mensajes de error
  await expect(page.getByText('El apellido es obligatorio.')).toBeVisible();
});