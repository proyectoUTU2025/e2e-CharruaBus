import { test, expect } from '@playwright/test';

test('Test Case 2: Datos incompletos o inválidos en el formulario de registro', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Acceder a la página de registro
  await page.getByText('¿No tienes cuenta? Regístrate').click();

  //5.Dejar campos obligatorios vacíos o ingresar datos que no cumplan las validaciones
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Cliente4');
  await page.getByText('Apellido').click();
  await page.getByRole('textbox', { name: 'Apellido' }).fill('Test');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('correo@test.com');
  await page.getByRole('combobox', { name: 'Tipo de Documento' }).locator('svg').click();
  await page.getByRole('option', { name: 'CEDULA' }).click();
  await page.getByText('Documento', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Documento' }).fill('84682214');


  //6.Verificar que el sistema detecta que los datos ingresados son incompletos o inválidos.
  await page.getByText('La cédula no es válida. El dí').click();
});