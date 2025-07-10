import { test, expect } from '@playwright/test';

test('Test Case 1: Modificación exitosa de una configuración', async ({ page }) => {

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

  //5.Acceder al menú “Configuraciones”
  await page.locator('mat-toolbar').getByRole('link', { name: 'Configuraciones' }).click();

  //6.Seleccionar una configuración a modificar
  await page.getByRole('row', { name: 'horas_penalizacion 24 -' }).getByRole('button').click();

  //7.Modificar el valor deseado
  await page.getByRole('spinbutton', { name: 'Valor (número)' }).fill('48');

  //8.Pulsar “Guardar”
  await page.getByRole('button', { name: 'Guardar' }).click();

  //9.Verificar que los cambios se reflejan al volver a abrir la configuración
  await expect(page.getByRole('cell', { name: '48' })).toBeVisible();
});