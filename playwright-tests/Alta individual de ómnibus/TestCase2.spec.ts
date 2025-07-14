import { test, expect } from '@playwright/test';

test('Test Case 2: Intentar registrar un ómnibus con matrícula ya existente', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();
  await page.waitForURL('**/login'); // Esperar a que la URL sea la de login
  await page.waitForLoadState('networkidle'); // Esperar a que la red esté inactiva después de la navegación a login
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible(); // Asegurar que el campo de email es visible

  //4.Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario1@gmail.com');
  await page.getByLabel('Contraseña', { exact: true }).fill('Vendedor12!'); // Usar getByLabel es más robusto
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForURL('**/home'); // Esperar a que la URL sea la de home después del login
  await page.waitForLoadState('networkidle'); // Esperar a que la red esté inactiva después del login
 
  //5.Acceder al módulo de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();
  await page.waitForLoadState('networkidle'); // Esperar a que la página de ómnibus cargue

  //6.Seleccionar la opción para agregar ómnibus.
  await page.getByRole('button', { name: 'Agregar Ómnibus' }).click();

  // Enfocarse en el modal "Agregar Nuevo Ómnibus" y esperar que sea visible.
  const agregarOmnibusModal = page.locator('mat-dialog-container', { hasText: 'Agregar Nuevo Ómnibus' });
  await expect(agregarOmnibusModal).toBeVisible();
  
  // 7. Completar los campos del formulario, ingresando una matrícula que ya existe en el sistema
  const matriculaInputField = agregarOmnibusModal.locator('input[formcontrolname="matricula"]');
  await expect(matriculaInputField).toBeVisible(); // Asegurar que el campo está visible en el modal

  await matriculaInputField.fill('Bas5586'); // Usar la matrícula existente 'Bas5586'

  await agregarOmnibusModal.getByRole('combobox', { name: 'Ubicación' }).click();
  await page.getByRole('option', { name: 'FLORIDA - Merin' }).click();
  await agregarOmnibusModal.getByRole('spinbutton', { name: 'Cantidad de Asientos' }).fill('60');

  //8.Pulsar "Guardar"
  await agregarOmnibusModal.getByRole('button', { name: 'Guardar' }).click();

  //9.Verificar que el sistema detecta la matrícula duplicada.
  //10.Verificar que se muestra el mensaje de error: "La matrícula ya está en uso:".
  await expect(page.getByText('La matrícula ya está en uso:')).toBeVisible();
});