import { test, expect } from '@playwright/test';

test('Test Case 2: No hay ómnibus disponibles para la fecha seleccionada', async ({ page }) => {

  await page.goto('http://localhost:4200/');

  await page.getByRole('link', { name: 'Login' }).click();
  await page.waitForURL('**/login');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.getByLabel('Contraseña', { exact: true }).fill('Vendedor12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForURL('**/home');
  await page.waitForLoadState('networkidle');

  await page.locator('mat-toolbar').getByRole('link', { name: 'Viajes' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Crear Viaje' }).click();

  const altaViajeModal = page.locator('mat-dialog-container', { hasText: 'Alta de Viaje' });
  await expect(altaViajeModal).toBeVisible();
  await expect(altaViajeModal.locator('mat-form-field', { hasText: 'Origen' })).toBeVisible();

  // 6. Completar los campos del viaje con una fecha y/o localidad para la cual se sabe que no hay ómnibus disponibles.
  await altaViajeModal.locator('mat-form-field', { hasText: 'Origen' }).getByRole('combobox').click();
  await page.getByRole('option', { name: 'CANELONES - Peru' }).click();

  await altaViajeModal.locator('mat-form-field', { hasText: 'Destino' }).getByRole('combobox').click();
  await page.getByRole('option', { name: 'DURAZNO - Durazno' }).click();

  await altaViajeModal.locator('mat-form-field').filter({ hasText: 'Fecha salida' }).getByLabel('Open calendar').click();
  await page.getByRole('button', { name: '15' }).click(); 

  await altaViajeModal.locator('mat-form-field').filter({ hasText: 'Fecha llegada' }).getByLabel('Open calendar').click();
  await page.getByRole('button', { name: '16' }).click();


  // Hora de salida
  await altaViajeModal.locator("mat-form-field", { hasText: "Hora de salida" }).getByRole("combobox").click();
  //await page.getByRole("option", { name: "06:00" }).waitFor({ state: 'visible', timeout: 5000 }); 
  await page.getByRole("option", { name: "00:10" }).click();


  await altaViajeModal.locator("mat-form-field", { hasText: "Hora de llegada" }).getByRole("combobox").click();

  //await page.getByRole('option', { name: '02:15' }).waitFor({ state: 'visible', timeout: 5000 }); 
  await page.getByRole('option', { name: '00:15' }).click();

  await altaViajeModal.getByRole('spinbutton', { name: 'Precio base' }).fill('1500');

  // Clic en "Siguiente" para ir a la etapa 2 (Paradas)
  await altaViajeModal.getByRole('button', { name: 'Siguiente' }).click();
  await altaViajeModal.locator('text="Paradas"').waitFor({ state: 'visible', timeout: 10000 });

  // Clic en "Siguiente" para ir a la etapa 3 (Selección de ómnibus)
  await altaViajeModal.getByRole('button', { name: 'Siguiente' }).click();
  await altaViajeModal.locator('text="Seleccione un ómnibus disponible"').waitFor({ state: 'visible', timeout: 10000 });

  // 7. Verificar que el sistema muestra el mensaje: "No hay ómnibus disponibles para los criterios especificados"
  await expect(altaViajeModal.getByText('directions_busNo hay ómnibus')).toBeVisible();

  // 8. Presionar el botón "Cancelar"
  await altaViajeModal.getByRole('button', { name: 'Cancelar' }).click();
  await expect(altaViajeModal).not.toBeVisible();
  await page.waitForURL('**/viajes'); // O '**/home' si es lo que ocurre al cancelar
});