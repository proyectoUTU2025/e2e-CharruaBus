import { test, expect } from '@playwright/test';

test('Test Case 3: Intentar inactivar un ómnibus con viajes futuros activos', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación    
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como vendedor
  await page.locator('.mat-mdc-form-field-infix').first().click();
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.locator('.mat-mdc-form-field.mat-mdc-form-field-type-mat-input.mat-mdc-form-field-has-icon-suffix > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vendedor12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Acceder al módulo de gestión de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

  //6.Seleccionar un ómnibus que esté "Activo" y que se sabe tiene viajes futuros asignados, y pulsar el botón "Desactivar Ómnibus".
  await page.getByRole('row', { name: '6 ASU5034 54 SALTO - Salto' }).getByRole('button').nth(1).click();

  //7.Confirmar la acción
  await page.getByRole('button', { name: 'Confirmar' }).click();

  //8.Verificar que se muestra el mensaje de error
  await expect(page.getByText('No se puede desactivar el ó')).toBeVisible();
});