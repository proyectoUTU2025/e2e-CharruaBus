import { test, expect } from '@playwright/test';

test('Test Case 3: Intentar registrar un usuario con correo electrónico ya existente', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Acceder a la página de registro
  await page.getByText('¿No tienes cuenta? Regístrate').click();

  //5.Completar todos los campos del formulario, ingresando un correo electrónico que ya está registrado en el sistema.
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Nuevo');
  await page.getByText('Apellido').click();
  await page.getByRole('textbox', { name: 'Apellido' }).fill('Cliente');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('cliente@test.com');
  await page.getByRole('combobox', { name: 'Tipo de Documento' }).locator('span').click();
  await page.getByRole('option', { name: 'CEDULA' }).click();
  await page.getByRole('textbox', { name: 'Documento' }).click();
  await page.getByRole('textbox', { name: 'Documento' }).fill('15843699');
  await page.getByRole('button', { name: 'Open calendar' }).click();
  await page.getByRole('button', { name: 'Choose month and year' }).click();
  await page.getByRole('button', { name: '2002' }).click();
  await page.getByRole('button', { name: 'enero de' }).click();
  await page.getByRole('button', { name: '17 de enero de' }).click();
  await page.getByRole('combobox', { name: 'Situación Laboral' }).locator('svg').click();
  await page.getByRole('option', { name: 'JUBILADO' }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('Cliente12!');
  await page.getByText('Confirmar Contraseña').click();
  await page.getByRole('textbox', { name: 'Confirmar Contraseña' }).press('ControlOrMeta+c');
  await page.getByRole('textbox', { name: 'Confirmar Contraseña' }).fill('Cliente12!');

  //6.Presionar "Crear cuenta"
  await page.getByRole('button', { name: 'Crear cuenta' }).click();

  //7.Verificar que el sistema muestra un mensaje de error indicando que el usuario ya existe
  await page.getByText('Ya existe un usuario con ese').click();
});