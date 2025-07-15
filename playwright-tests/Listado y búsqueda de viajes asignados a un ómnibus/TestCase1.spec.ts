import { test, expect } from '@playwright/test';

test('Test Case 1: Búsqueda exitosa de viajes asignados a un ómnibus con filtros', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Acceder al módulo de gestión de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

  //6.Seleccionar el detalle del ómnibus 
  await page.getByRole('row', { name: '1 AAA-1111 45 MALDONADO -' }).getByRole('button').first().click();

  //7.Aplicar filtros deseados
  await page.getByRole('combobox', { name: 'Destino' }).locator('svg').click();
  await page.getByRole('option', { name: 'MONTEVIDEO - Terminal Tres' }).click();

  //8.Pulsar "Buscar"
  await page.getByRole('button', { name: 'Buscar' }).click();

  //9.Verificar que el sistema consulta y muestra solo los movimientos
  await expect(page.getByRole('cell', { name: 'MONTEVIDEO - Terminal Tres' }).first()).toBeVisible();
});