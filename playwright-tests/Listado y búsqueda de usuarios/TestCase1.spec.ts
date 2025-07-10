import { test, expect } from '@playwright/test';

test('Test Case 1: Listado de usuarios con filtros aplicados', async ({ page }) => {

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

  //6.Aplicar uno o más filtros válidos
  await page.getByRole('combobox', { name: 'Rol' }).locator('svg').click();
  await page.getByRole('option', { name: 'ADMIN' }).click();

  //7.Pulsar “Buscar”
  await page.getByRole('button', { name: 'Buscar' }).click();

  //8.Verificar que se muestra una lista con usuarios que cumplen los criterios
  await expect(page.locator('span').filter({ hasText: /^Admin$/ })).toBeVisible();
});