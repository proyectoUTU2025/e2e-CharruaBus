import { test, expect } from '@playwright/test';

test('Test Case 2: Listado de viajes asignados sin aplicar filtros', async ({ page }) => {

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

  //5.Acceder al módulo de gestión de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

  //6.Seleccionar el detalle del ómnibus
  await page.getByRole('row', { name: '6 ASU5034 54 SALTO - Salto' }).getByRole('button').first().click();

  //7.Sin aplicar ningún filtro, verificar que el sistema consulta y muestra todos los movimientos
  await expect(page.locator('app-omnibus-history div').filter({ hasText: 'ID Salida Llegada Origen' })).toBeVisible();
});