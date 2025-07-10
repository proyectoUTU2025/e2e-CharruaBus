import { test, expect } from '@playwright/test';

test(' Test Case 2: Intentar registrar un ómnibus con matrícula ya existente', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vendedor12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Acceder al módulo de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

  //6.Seleccionar la opción para agregar ómnibus.
  await page.getByRole('button', { name: 'Agregar Ómnibus' }).click();

  //7.Completar los campos del formulario, ingresando una matrícula que ya existe en el sistema
  await page.getByRole('textbox', { name: 'Matrícula' }).fill('Bas5586');
  await page.getByRole('combobox', { name: 'Ubicación' }).locator('svg').click();
  await page.getByRole('option', { name: 'FLORIDA - Merin' }).click();
  await page.getByRole('spinbutton', { name: 'Cantidad de Asientos' }).click();
  await page.getByRole('spinbutton', { name: 'Cantidad de Asientos' }).fill('60');

  //8.Pulsar "Guardar"
  await page.getByRole('button', { name: 'Guardar' }).click();

  //9.Verificar que el sistema detecta la matrícula duplicada.
  //10.Verificar que se muestra el mensaje de error: "El ómnibus ya está registrado".
  await expect(page.getByText('La matrícula ya está en uso:')).toBeVisible();
});