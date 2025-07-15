import { test, expect } from '@playwright/test';

test('Test Case 2: El administrador cancela la edición', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como administrador
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Admin123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Ir al menú "Usuarios"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();

  //6.Modificar uno o varios campos del formulario con datos válidos y correctos
  await page.getByRole('row', { name: '7 Cliente3 Test 03/03/1992' }).getByRole('button').first().click();
  const editarUsuarioModal = page.locator('mat-dialog-container', { hasText: 'Editar Usuario' });
  await expect(editarUsuarioModal).toBeVisible(); // Asegurarse de que el modal es visible

  await editarUsuarioModal.getByRole('textbox', { name: 'Apellido' }).click();
  await editarUsuarioModal.getByRole('textbox', { name: 'Apellido' }).fill('Apellido');

  //7.Presionar el botón "Cancelar"
  await page.getByRole('button', { name: 'Cancelar' }).click();
});