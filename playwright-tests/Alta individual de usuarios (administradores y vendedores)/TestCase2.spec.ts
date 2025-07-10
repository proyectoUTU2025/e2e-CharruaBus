import { test, expect } from '@playwright/test';

test('Test Case 2: Usuario ya registrado', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación  
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como administrador
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('admin');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Ir al menú "Usuarios"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();

  //6.Hacer clic en "Crear Usuario"
  await page.getByRole('button', { name: 'Crear Usuario' }).click();

  //7.Completar todos los campos del formulario con datos válidos y un correo electrónico que ya exista en el sistema
  await page.locator('#mat-mdc-form-field-label-10').getByText('Apellido').click();
  await page.getByRole('textbox', { name: 'Apellido' }).fill('apellido');
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Usuario2');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('usuario1@gmail.com');
  await page.getByRole('combobox', { name: 'Tipo de Documento' }).locator('span').click();
  await page.getByRole('option', { name: 'CEDULA' }).click();
  await page.locator('#mat-mdc-form-field-label-13').getByText('Documento').click();
  await page.getByRole('textbox', { name: 'Documento' }).fill('25488953');
  await page.getByRole('button', { name: 'Open calendar' }).click();
  await page.getByRole('button', { name: 'Choose month and year' }).click();
  await page.getByRole('button', { name: '2002' }).click();
  await page.getByRole('button', { name: 'August' }).click();
  await page.getByRole('button', { name: 'August 13,' }).click();
  await page.getByRole('combobox', { name: 'Rol' }).locator('svg').click();
  await page.getByRole('option', { name: 'VENDEDOR' }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('Vendedor12!');
  await page.getByText('Confirmar Contraseña').click();
  await page.getByRole('textbox', { name: 'Confirmar Contraseña' }).fill('Vendedor12!');

  //8.Pulsar “Guardar”
  await page.getByRole('button', { name: 'Guardar' }).click();

  //9.Verificar que se muestra el mensaje: “El email ya está registrado en el sistema”
  await expect(page.getByText('Email ya registrado en el')).toBeVisible();
});