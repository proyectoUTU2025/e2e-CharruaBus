import { test, expect } from '@playwright/test';

test(' Test Case 2: Listado sin aplicar ningún filtro', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación     
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();
 
  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vendedor12!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Acceder al módulo de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

  //6.Pulsar "Buscar"
  await page.getByRole('button', { name: 'Buscar' }).click();

  //7.Verificar que el sistema muestra el listado completo de todos los ómnibus registrados en el sistema.
  const omnibusRowsLocator = page.locator("tbody tr")
  await expect(omnibusRowsLocator.first()).toBeVisible({ timeout: 15000 })
  const count = await omnibusRowsLocator.count()
  console.log(`Número de resultados encontrados: ${count}`)

  await expect(count).toBeGreaterThan(2); 
});