import { test, expect } from '@playwright/test';

test('Test Case 2: Cancelar la edición del perfil', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación    
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Ingresar un email y contraseña válidos (vendedor o cliente)
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('cliente2@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Navegar a la sección "Mi perfil"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();

  //6.Modificar uno o varios campos del formulario
  await page.getByRole('textbox', { name: 'Apellido' }).click();
  await page.getByRole('textbox', { name: 'Apellido' }).fill('Apellido');
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('usuario3');

  //7.Pulsar el botón "Cancelar"
  await page.locator('app-edit-personal-info').getByRole('button', { name: 'Cancelar' }).click();
});