import { test, expect } from '@playwright/test';

test('Test Case 1: Alta exitosa de nuevo usuario', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Verificar que se muestre el boton de login
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

  //4.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //5.Iniciar sesión como administrador
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('admin');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //6.Ir al menú "Usuarios"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();

  //7.Hacer clic en "Crear Usuario"
  await page.getByRole('button', { name: 'Crear Usuario' }).click();

  //8.Completar todos los campos del formulario con datos válidos
  await page.getByRole('textbox', { name: 'Nombre' }).fill('usuario2');
  await page.getByRole('textbox', { name: 'Apellido' }).click();
  await page.getByRole('textbox', { name: 'Apellido' }).fill('apellido');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('usuario1@gmail.com');
  await page.getByRole('combobox', { name: 'Tipo de Documento' }).locator('svg').click();
  await page.getByRole('option', { name: 'CEDULA' }).click();
  await page.locator('#mat-mdc-form-field-label-13').getByText('Documento').click();
  await page.getByRole('textbox', { name: 'Documento' }).fill('25488953');
  await page.getByRole('button', { name: 'Open calendar' }).click();
  await page.getByRole('button', { name: 'Choose month and year' }).click();
  await page.getByRole('button', { name: '2002' }).click();
  await page.getByRole('button', { name: 'December' }).click();
  await page.getByRole('button', { name: 'December 3,' }).click();
  await page.getByRole('combobox', { name: 'Rol' }).locator('svg').click();
  await page.getByRole('option', { name: 'VENDEDOR' }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('Vendedor12!');
  await page.getByText('Confirmar Contraseña').click();
  await page.getByRole('textbox', { name: 'Confirmar Contraseña' }).fill('Vendedor12!');

  //9.Pulsar “Guardar”
  await page.getByRole('button', { name: 'Guardar' }).click();

  //10.Verificar que el nuevo usuario aparece en la lista de usuarios
  await page.getByRole('textbox', { name: 'Documento' }).click();
  await page.getByRole('textbox', { name: 'Documento' }).fill('25488953');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByRole('cell', { name: '25488953' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'usuario1' })).toBeVisible();


});