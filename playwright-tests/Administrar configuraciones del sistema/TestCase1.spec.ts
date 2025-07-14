import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }) => {
  const nombreConfiguracion = 'max_pasajes_por_compra';
  const valorOriginal = '10'; // Valor original de 'max_pasajes_por_compra' según tu captura

  console.log(`Ejecutando cleanup: Restaurando '${nombreConfiguracion}' a '${valorOriginal}'`);

  // Asegurarse de que estamos en la página de configuraciones si el test terminó en otro lugar
  // Esto es un safety net, puede que no sea estrictamente necesario si el test siempre termina en la misma página.
  await page.locator('mat-toolbar').getByRole('link', { name: 'Configuraciones' }).click();

  // Seleccionar la configuración a modificar (el lápiz)
  const filaConfiguracion = page.locator(`tr:has-text("${nombreConfiguracion}")`);
  await filaConfiguracion.getByRole('button').click();

  // Esperar a que la ventana modal de edición aparezca
  await expect(page.getByRole('heading', { name: 'Editar Configuración' })).toBeVisible();

  // Modificar el valor deseado de vuelta al original
  await page.getByRole('spinbutton', { name: 'Valor Entero' }).fill(valorOriginal);

  // Pulsar “Guardar”
  await page.getByRole('button', { name: 'Guardar' }).click();

  // Esperar a que la modal se cierre
  await expect(page.getByRole('heading', { name: 'Editar Configuración' })).not.toBeVisible();

  // Verificar que el valor se restauró en la tabla
  const valorRestauradoEnTabla = page.locator(`tr:has-text("${nombreConfiguracion}") td:nth-child(3)`);
  await expect(valorRestauradoEnTabla).toHaveText(valorOriginal);

  console.log(`Cleanup completado: '${nombreConfiguracion}' restaurado a '${valorOriginal}' exitosamente.`);
});

test('Test Case 1: Modificación exitosa de una configuración', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación    
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como administrador
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Admin123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  // Opcional: Esperar a que la navegación post-login se complete, por ejemplo, esperando un elemento en el dashboard
  await expect(page.getByText('Bienvenido')).toBeVisible();

  //5.Acceder al menú “Configuraciones”
  await page.locator('mat-toolbar').getByRole('link', { name: 'Configuraciones' }).click();

  const nombreConfiguracion = 'max_pasajes_por_compra';
  const nuevoValor = '48'; // El valor al que el test modificará la configuración

  //6.Seleccionar una configuración a modificar (hacer clic en el lápiz)
  const filaConfiguracion = page.locator(`tr:has-text("${nombreConfiguracion}")`);
  await filaConfiguracion.getByRole('button').click();

  // Esperar a que la ventana modal de edición aparezca
  await expect(page.getByRole('heading', { name: 'Editar Configuración' })).toBeVisible();

  //7.Modificar el valor deseado
  await page.getByRole('spinbutton', { name: 'Valor Entero' }).fill(nuevoValor);

  //8.Pulsar “Guardar”
  await page.getByRole('button', { name: 'Guardar' }).click();

  // Opcional: Esperar a que la modal se cierre o que se muestre un mensaje de éxito.
  await expect(page.getByRole('heading', { name: 'Editar Configuración' })).not.toBeVisible();

  //9.Verificar que los cambios se reflejan en la tabla
  const valorEnTabla = page.locator(`tr:has-text("${nombreConfiguracion}") td:nth-child(3)`);
  await expect(valorEnTabla).toHaveText(nuevoValor);
  await expect(page.getByRole("cell", { name: "48" })).toBeVisible()

  console.log(`Configuración '${nombreConfiguracion}' actualizada a '${nuevoValor}' exitosamente.`);
});
