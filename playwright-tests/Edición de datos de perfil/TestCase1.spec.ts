import { test, expect } from '@playwright/test';

test('Test Case 1: Modificación exitosa de datos de perfil por el cliente/vendedor', async ({ page }) => {
  
  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación  
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Ingresar un email y contraseña válidos (vendedor o cliente)
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('cliente@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Navegar a la sección "Mi perfil"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();

  //6.Verificar que se muestra el formulario con los datos actuales del perfil
  await expect(page.locator('mat-card-content').filter({ hasText: 'NombreApellidoEmailTipo de' })).toBeVisible();

  //7.Modificar uno o varios campos del formulario con datos válidos y correctos.
  await page.locator('mat-form-field:nth-child(2) > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').first().click();
  await page.getByRole('textbox', { name: 'Apellido' }).fill('Apellido');

  //8.Pulsar el botón "Guardar"
  await page.getByRole('button', { name: 'Guardar' }).click();
});