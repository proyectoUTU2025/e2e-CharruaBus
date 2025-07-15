import { test, expect } from '@playwright/test';

test('Test Case 2: No hay datos disponibles para la estadística solicitada', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación  
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Presionar la sección de "Estadísticas"
  await page.locator('mat-toolbar').getByRole('button', { name: 'Estadísticas' }).click();

  //6.Seleccionar la opción "Viajes por Departamento"
  await page.getByRole('menuitem', { name: 'Viajes por Departamento' }).click();

  //7.Verificar que se muestra el mensaje "No hay datos disponibles"
  await page.getByText('search_offNo se encontraron').click();
});