import { test, expect } from '@playwright/test';

test('Test Case 1: Alta exitosa de una nueva localidad', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación  
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como vendedor
  await page.getByText('Email').click();
  await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Seleccionar "Localidades" desde la barra de navegación
  await page.locator('mat-toolbar').getByRole('link', { name: 'Localidades' }).click();

  //6.Luego seleccionar "Crear Localidad"
  await page.getByRole('button', { name: 'Crear Localidad' }).click();

  // Definir el localizador del modal de creación de localidad
  const crearLocalidadModal = page.locator('mat-dialog-container', { hasText: 'Crear Localidad' });
  await expect(crearLocalidadModal).toBeVisible(); // Asegurar que el modal es visible

  //7.Completar ambos campos con datos válidos y únicos
  // Generar un nombre único para la localidad 
  const newLocalityName = 'Nueva Localidad ' + Date.now(); 
  await crearLocalidadModal.getByRole('textbox', { name: 'Nombre' }).click();
  await crearLocalidadModal.getByRole('textbox', { name: 'Nombre' }).fill(newLocalityName);
  await crearLocalidadModal.getByRole('combobox', { name: 'Departamento' }).locator('span').click();
  await page.getByRole('option', { name: 'ARTIGAS' }).click(); // Seleccionar un departamento

  //8.Pulsar "Guardar"
  await crearLocalidadModal.getByRole('button', { name: 'Guardar' }).click();

  // Esperar explícitamente a que el modal de creación se cierre
  await expect(crearLocalidadModal).not.toBeVisible();
  await page.waitForLoadState('networkidle'); // Asegurar que la lista se haya recargado

  //9.Verificar que el sistema registra la nueva localidad, incluso si está en otra página
  let found = false;
  const maxAttempts = 5; // Limitar el número de páginas a revisar para evitar bucles infinitos
  
  for (let i = 0; i < maxAttempts; i++) {
    const localityCell = page.getByRole('cell', { name: newLocalityName });

    if (await localityCell.isVisible()) {
      found = true;
      break; // La localidad fue encontrada
    }

    // Intentar ir a la siguiente página
    const nextPageButton = page.getByRole('button', { name: 'Página siguiente' }); 
    
    // Verificar si el botón de "Siguiente página" está deshabilitado
    const isNextButtonDisabled = await nextPageButton.isDisabled();

    if (!isNextButtonDisabled) {
      await nextPageButton.click();
      await page.waitForLoadState('networkidle'); // Esperar que la nueva página cargue
    } else {
      // No hay más páginas y la localidad no fue encontrada
      break;
    }
  }

  // Afirmar que la localidad fue encontrada
  expect(found).toBeTruthy(); 
});