import { test, expect } from '@playwright/test';

test('Test Case 2: Desactivación exitosa de un ómnibus activo (sin viajes futuros)', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación    
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Acceder al módulo de gestión de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

  //6.Seleccionar un ómnibus que esté "Activo" y sin viajes futuros y pulsar el botón "Desactivar Ómnibus"
  await page.getByRole('row', { name: 'BRO-2222 50 Desconocido Activo' }).getByRole('button').nth(1).click();

  //7.Confirmar la acción
  await page.getByRole('button', { name: 'Confirmar' }).click();

  //8.Verificar que el sistema actualiza el estado del ómnibus a "Inactivo"
  await expect(page.getByText('Inactivo')).toBeVisible();
});