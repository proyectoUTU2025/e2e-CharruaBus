import { test, expect } from '@playwright/test';

function generarNumeroAleatorioDe3Cifras() {
    return Math.floor(Math.random() * 900) + 100;
}

test('Test Case 4: Código de verificación de email inválido o expirado', async ({ page }) => {

  const numero = generarNumeroAleatorioDe3Cifras();  

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Acceder a la página de registro
  await page.getByText('¿No tienes cuenta? Regístrate').click();

  //5.Completar todos los campos del formulario con datos validos
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Cliente' + numero);
  await page.getByRole('textbox', { name: 'Apellido' }).click();
  await page.getByRole('textbox', { name: 'Apellido' }).fill('Test');
  await page.getByText('Correo').click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('cliente' + numero + '@test.com');
  await page.getByText('Tipo de Documento').click();
  await page.getByRole('option', { name: 'CEDULA' }).click();
  await page.getByRole('textbox', { name: 'Documento' }).click();
  await page.getByRole('textbox', { name: 'Documento' }).fill('84293578');
  await page.getByText('Fecha de Nacimiento').click();
  await page.getByRole('button', { name: 'Open calendar' }).click();
  await page.getByRole('button', { name: 'Choose month and year' }).click();
  await page.getByRole('button', { name: '2002' }).click();
  await page.getByRole('button', { name: 'julio de' }).click();
  await page.getByRole('button', { name: '4 de julio de 2002', exact: true }).click();
  await page.getByRole('combobox', { name: 'Situación Laboral' }).locator('svg').click();
  await page.getByRole('option', { name: 'ESTUDIANTE' }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('Cliente12!');
  await page.getByText('Confirmar Contraseña').click();
  await page.getByRole('textbox', { name: 'Confirmar Contraseña' }).fill('Cliente12!');

  //6.Presionar "Crear cuenta"
  await page.getByRole('button', { name: 'Crear cuenta' }).click();

  //7.Ingresar un código que se sabe que es inválido
  await page.locator('.digit-input').first().fill('5');
  await page.locator('input:nth-child(2)').fill('1');
  await page.locator('input:nth-child(3)').fill('7');
  await page.locator('input:nth-child(4)').fill('9');
  await page.locator('input:nth-child(5)').fill('4');
  await page.locator('input:nth-child(6)').fill('6');

  //8.Presionar "Validar"
  await page.getByRole('button', { name: 'Validar' }).click();

  //9.Verificar que el sistema muestra un mensaje de error: "Código inválido o expirado"
  await page.getByText('Código inválido o expirado').click();
});