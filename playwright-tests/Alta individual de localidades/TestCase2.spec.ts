import { test, expect } from '@playwright/test';

test('Test Case 2: Intentar registrar una localidad ya existente', async ({ page }) => {

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

  //5.Seleccionar "Localidades" desde la barra de navegación
  await page.locator('mat-toolbar').getByRole('link', { name: 'Localidades' }).click();

  //6.Luego seleccionar "Crear Localidad"
  await page.getByRole('button', { name: 'Crear Localidad' }).click();

  const crearLocalidadModal = page.locator('mat-dialog-container', { hasText: 'Crear Localidad' });
  await expect(crearLocalidadModal).toBeVisible(); // Asegurarse de que el modal es visible

  //7.Completar los campos "Departamento" y "Nombre de localidad" con una combinación que ya existe en el sistema
  await crearLocalidadModal.getByRole('textbox', { name: 'Nombre' }).fill('Durazno');
  
  await crearLocalidadModal.getByRole('combobox', { name: 'Departamento' }).click();
  await page.getByRole('option', { name: 'DURAZNO' }).click(); // La opción se busca globalmente, no necesita el prefijo del modal.

  //8.Pulsar "Guardar"
  await crearLocalidadModal.getByRole('button', { name: 'Guardar' }).click();


  //9.Verificar que se muestra un mensaje de error
  await page.getByText('Ya existe una localidad \'').click();
});