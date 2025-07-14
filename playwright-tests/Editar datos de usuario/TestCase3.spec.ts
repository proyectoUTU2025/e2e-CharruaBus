import { test, expect } from '@playwright/test';

test('Test Case 3: Ingreso de datos inválidos por el administrador', async ({ page }) => {

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

  //6.Modificar uno o varios campos del formulario con datos válidos y correctos
  await page.getByRole('row', { name: '7 Cristian Silva 01/01/2000' }).getByRole('button').first().click();
  const editarUsuarioModal = page.locator('mat-dialog-container', { hasText: 'Editar Usuario' });
  await expect(editarUsuarioModal).toBeVisible(); // Asegurarse de que el modal es visible

  await editarUsuarioModal.getByRole('textbox', { name: 'Documento' }).click();
  await editarUsuarioModal.getByRole('textbox', { name: 'Documento' }).fill('15846984');

  //7.Verificar que el sistema muestra mensajes de error específicos
  await page.getByText('La cédula no es válida. El dí').click();
});