import { test, expect } from '@playwright/test';

test('Test Case 3: Ómnibus sin viajes asignados', async ({ page }) => {

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

  //6.Seleccionar el detalle del ómnibus que no tiene viajes asignados
  await page.getByRole('button', { name: 'Página siguiente' }).click();
  await page.getByRole('row', { name: '8 TEST062480 60 DURAZNO -' }).getByRole('button').first().click();
  const historialMovimientosModal = page.locator('mat-dialog-container', { hasText: 'Historial de Movimientos' });
  await expect(historialMovimientosModal).toBeVisible({ timeout: 10000 }); 

  //7. Verificar que el número de viajes no sea mayor a 1
  const initialCells = historialMovimientosModal.getByRole('cell', { name: 'INICIAL' });
  const count = await initialCells.count();
  expect(count).toBeLessThanOrEqual(1);
});