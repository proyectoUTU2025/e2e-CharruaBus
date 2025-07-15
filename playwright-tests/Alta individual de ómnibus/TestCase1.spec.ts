import { test, expect } from '@playwright/test';

test('Test Case 1: Alta exitosa de un nuevo ómnibus', async ({ page }) => {

  //1. Lanzar el navegador y navegar a la URL de la aplicación  
  await page.goto('http://localhost:4200/');

  //2. Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();
  await page.waitForURL('**/login'); // Esperar a que la URL sea la de login
  await page.waitForLoadState('networkidle'); // Esperar a que la red esté inactiva después de la navegación a login
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible(); 

  //3. Iniciar sesión como vendedor
  await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
  await page.getByLabel('Contraseña', { exact: true }).fill('Vend123!$'); 
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForURL('**/home'); // Esperar a que la URL sea la de home después del login
  await page.waitForLoadState('networkidle'); // Esperar a que la red esté inactiva después del login

  //4. Acceder al módulo de ómnibus
  await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();
  await page.waitForLoadState('networkidle'); // Esperar a que la página de ómnibus cargue

  //5. Seleccionar la opción para agregar ómnibus.
  await page.getByRole('button', { name: 'Agregar Ómnibus' }).click();

  const agregarOmnibusModal = page.locator('mat-dialog-container', { hasText: 'Agregar Nuevo Ómnibus' });
  await expect(agregarOmnibusModal).toBeVisible(); // Esperar que el modal sea visible
  await expect(agregarOmnibusModal.getByRole('textbox', { name: 'Matrícula' })).toBeVisible(); 

  //6. Completar todos los campos requeridos en el formulario de alta
  // Generar una matrícula única para evitar conflictos en ejecuciones repetidas
  const matriculaUnica = `TEST${Date.now().toString().slice(-6)}`; 
  await agregarOmnibusModal.getByRole('textbox', { name: 'Matrícula' }).fill(matriculaUnica);

  await agregarOmnibusModal.getByRole('combobox', { name: 'Ubicación' }).click();
  await page.getByRole('option', { name: 'MALDONADO - Punta del Este' }).waitFor({ state: 'visible', timeout: 5000 });
  await page.getByRole('option', { name: 'MALDONADO - Punta del Este' }).click();

  await agregarOmnibusModal.getByRole('spinbutton', { name: 'Cantidad de Asientos' }).fill('60');

  //7. Pulsar "Guardar"
  await agregarOmnibusModal.getByRole('button', { name: 'Guardar' }).click();

  //8. Verificar que el ómnibus recién registrado aparece en la lista de ómnibus
  // Esperar que el modal desaparezca después de guardar
  await expect(agregarOmnibusModal).not.toBeVisible();
  await page.waitForLoadState('networkidle'); // Esperar a que la tabla se actualice

  let foundOmnibus = false;
  const maxPagesToSearch = 20;
  
  const omnibusRowLocator = page.locator('tr[role="row"][mat-row]', { hasText: matriculaUnica });
  // Localizador del botón de "Siguiente página", buscando el habilitado.
  // Basado en la imagen, el botón de siguiente es el que tiene el '>' solo.
  const nextPageButton = page.locator('button[aria-label="Página siguiente"]:not([disabled])'); 

  await page.waitForLoadState('networkidle'); // Asegurar que la tabla inicial cargó

  for (let i = 0; i < maxPagesToSearch; i++) {
    console.log(`Buscando matrícula ${matriculaUnica} en la página ${i + 1}.`);

    // Intentar encontrar el ómnibus con un timeout corto.
    try {
      await expect(omnibusRowLocator).toBeVisible({ timeout: 5000 }); 
      foundOmnibus = true;
      console.log(`¡Éxito! Matrícula ${matriculaUnica} encontrada en la página ${i + 1}.`);
      break; 
    } catch (e) {
      console.log(`Matrícula ${matriculaUnica} NO encontrada en la página ${i + 1}.`);
      // No encontrado en esta página, intentar avanzar
    }

    // Si no se encontró en la página actual, intentar ir a la siguiente si está disponible.
    // Verificamos visibilidad y estado habilitado antes de intentar hacer clic.
    const isNextPageButtonVisible = await nextPageButton.isVisible(); 
    const isNextPageButtonEnabled = await nextPageButton.isEnabled();
    
    if (isNextPageButtonVisible && isNextPageButtonEnabled) { 
      console.log('Haciendo clic en Siguiente Página.');
      await nextPageButton.click();
      await page.waitForLoadState('networkidle'); // Esperar a que la nueva página cargue completamente
    } else {
      console.log('No hay más páginas o el botón "Siguiente" está deshabilitado/invisible. Fin de la búsqueda.');
      break; // No hay más páginas o el botón está deshabilitado/invisible
    }
  }

  // Aserción final: verificar que el ómnibus fue encontrado en alguna de las páginas.
  // Si foundOmnibus es false, esta línea fallará y mostrará el error original.
  await expect(foundOmnibus).toBeTruthy(); 
  
  // Si se encontró, realizar las aserciones de visibilidad y estado "Activo".
  if (foundOmnibus) { 
      await expect(omnibusRowLocator).toBeVisible(); 
      await expect(omnibusRowLocator.getByText('Activo')).toBeVisible();
  }
});