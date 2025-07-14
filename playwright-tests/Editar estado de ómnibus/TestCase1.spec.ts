import { test, expect } from '@playwright/test';

test('Test Case 1: Activación exitosa de un ómnibus inactivo', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación    
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vendedor12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Acceder al módulo de gestión de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

  //6.Seleccionar un ómnibus que esté "Inactivo" y pulsar el botón "Activar Ómnibus"
  await page.getByRole('button', { name: 'Página siguiente' }).click();
  await page.getByRole('button').filter({ hasText: 'toggle_off' }).click();

  //7.Confirmar la acción
  await page.getByRole('button', { name: 'Confirmar' }).click();

  //8.Verificar que el sistema actualiza el estado del ómnibus a "Activo"
  await expect(page.getByRole('cell', { name: 'Activo' }).nth(4)).toBeVisible();
});