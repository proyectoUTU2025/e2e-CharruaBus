import { test, expect } from '@playwright/test';

test('Test Case 1: Generación exitosa de estadísticas de viajes con visualización gráfica y descarga CSV', async ({ page }) => {

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
  await page.waitForLoadState('networkidle'); // Esperar a que la página cargue

  //5.Presionar la sección de "Estadísticas"
  await page.locator('mat-toolbar').getByRole('button', { name: 'Estadísticas' }).click();
  await page.waitForLoadState('networkidle'); // Esperar a que la sección cargue

  //6.Seleccionar la opción "Viajes por Ómnibus"
  await page.getByRole('menuitem', { name: 'Pasajes' }).click();
  await page.waitForLoadState('networkidle'); // Esperar a que la subsección cargue

  //7.Seleccionar la opción "Descargar CSV"
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Resumen CSV' }).click();
  const download = await downloadPromise;

  //8.Verificar que el sistema genera y descarga el archivo CSV
  const csvFilePath = `./temp_descarga_${download.suggestedFilename() || 'reporte.csv'}`;
  await download.saveAs(csvFilePath);
  console.log(`CSV descargado y guardado en: ${csvFilePath}`);

});