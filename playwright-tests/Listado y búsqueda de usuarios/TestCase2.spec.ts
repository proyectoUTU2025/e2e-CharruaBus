import { test, expect } from '@playwright/test';

test('Test Case 2: No se encuentran usuarios', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación    
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como administrador
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('admin');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Ir al menú "Usuarios"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();
 
  //6.Aplicar uno o más filtros 
  await page.getByRole('combobox', { name: 'Rol' }).locator('svg').click();
  await page.getByRole('option', { name: 'CLIENTE' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('admin');

  //7.Pulsar “Buscar”
  await page.getByRole('button', { name: 'Buscar' }).click();

  //8.Verificar que se muestra el mensaje: “No se encontraron usuario”
  await expect(page.getByText('peopleNo se encontraron')).toBeVisible();
});