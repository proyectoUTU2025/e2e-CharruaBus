import { test, expect } from "@playwright/test"

test("Test Case 1: Registrar Viaje Expreso", async ({ page }) => {

  const expectedDestination = `MONTEVIDEO - Terminal Tres Cruces`  
  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación
  await page.goto("http://localhost:4200/")
  await page.waitForLoadState("networkidle") // Esperar que la página inicial cargue

  //3.Ir a la página de login
  await page.getByRole("link", { name: "Login" }).click()
  await page.waitForURL("**/login") // Esperar a que la URL de login se cargue
  await page.waitForLoadState("networkidle") // Esperar a que la red esté inactiva
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible() // Asegurar que el campo de email es visible

  //4.Iniciar sesión como vendedor
  await page.getByRole("textbox", { name: "Email" }).fill("vendedor@test.com")
  await page.getByLabel("Contraseña", { exact: true }).fill("Vend123!$")
  await page.getByRole("button", { name: "Iniciar sesión" }).click()
  await page.waitForURL("**/home") // Esperar a que la navegación a home se complete
  await page.waitForLoadState("networkidle") // Esperar a que la red esté inactiva

  //5. Acceder al módulo de ómnibus
  await page.locator("mat-toolbar").getByRole("link", { name: "Ómnibus" }).click()
  await page.waitForURL("**/omnibus")
  await page.waitForLoadState("networkidle") // Esperar a que la red esté inactiva después de navegar

  //6.Seleccionar la opción "detalle" en las acciones de un ómnibus de la lista
  await page
    .getByRole("row", { name: /AAA-1111/ })
    .getByRole("button")
    .first()
    .click()

  // Esperar a que el primer modal de detalle del ómnibus sea visible
  const detalleOmnibusModal = page.locator("mat-dialog-container", { hasText: "Historial de Movimientos" })
  await expect(detalleOmnibusModal).toBeVisible()
  await page.waitForLoadState("networkidle") // Esperar que el modal de detalle cargue completamente

  //7.Seleccionar la opción de "Crear viaje expreso" dentro del modal de detalle.
  await detalleOmnibusModal.getByRole("button", { name: "Registrar Viaje Expreso" }).click()

  // --- INICIO: Interacción con el segundo modal "Alta de Viaje Expreso" ---
  const altaViajeModal = page.locator("mat-dialog-container", { hasText: "Alta de Viaje Expreso" })
  await expect(altaViajeModal).toBeVisible() // Asegurarse de que el segundo modal esté visible
  await page.waitForLoadState("networkidle") // Esperar que el modal de alta de viaje cargue completamente

  //8.Completar todos los campos requeridos con datos válidos en el segundo modal.

  // Destino:
  await altaViajeModal.locator("mat-form-field", { hasText: "Destino" }).getByRole("combobox").click()
  await page.getByRole("option", { name: `${expectedDestination}` }).click()

  // Selección de Fecha de salida
  const currentYear = new Date().getFullYear()
  await altaViajeModal
    .locator("mat-form-field")
    .filter({ hasText: "Fecha de salida" })
    .getByLabel("Open calendar")
    .click()
  await page.getByRole("button", { name: `27 de julio de ${currentYear}` }).click()

  // Esperar a que el backdrop del datepicker desaparezca antes de interactuar con el siguiente campo
  await expect(page.locator(".mat-datepicker-4-backdrop")).not.toBeVisible({ timeout: 10000 })

  // Hora de salida:
  await altaViajeModal
    .locator("mat-form-field", { hasText: "Hora de salida" })
    .getByRole("combobox")
    .click({ force: true })
  await page.getByRole("option", { name: "00:05" }).click()

  // Selección de Fecha de llegada
  await altaViajeModal
    .locator("mat-form-field")
    .filter({ hasText: "Fecha de llegada" })
    .getByLabel("Open calendar")
    .click()
  await page.getByRole("button", { name: `28 de julio de ${currentYear}` }).click()


  // Esperar a que el backdrop del datepicker desaparezca después de la segunda fecha también
  await expect(page.locator(".mat-datepicker-4-backdrop")).not.toBeVisible({ timeout: 10000 })

  await page.waitForTimeout(500);
  // Hora de llegada:
  await altaViajeModal
    .locator("mat-form-field", { hasText: "Hora de llegada" })
    .getByRole("combobox")
    .click({ force: true })
  await page.getByRole("option", { name: "00:05" }).waitFor({ state: 'visible' });
  await page.getByRole("option", { name: "00:05" }).click(); 
  
  
  //9.Registrar el viaje con los datos proporcionados
  await altaViajeModal.getByRole("button", { name: "Registrar viaje", exact: true }).click()
  await page.waitForLoadState("networkidle") 

  // Esperar a que el segundo modal de alta de viaje se cierre.
  await expect(altaViajeModal).not.toBeVisible({ timeout: 20000 })
  // --- FIN: Interacción con el segundo modal "Alta de Viaje Expreso" ---

  // 10.Verificar que los datos del nuevo viaje expreso se guardan en el sistema

  
  await expect(detalleOmnibusModal).toBeVisible() 

  const historialMovimientosTable = detalleOmnibusModal.locator("table") 

 
  const currentMonth = new Date().getMonth() + 1 
  const expectedSalidaDate = `27/${currentMonth.toString().padStart(2, "0")}/${currentYear}`
  const expectedLlegadaDate = `28/${currentMonth.toString().padStart(2, "0")}/${currentYear}`

  const newTripRow = historialMovimientosTable
    .getByRole("row")
    .filter({
      has: page.getByRole("cell", { name: expectedDestination }), 
    })
    .filter({
      has: page.getByRole("cell", { name: "EXPRESO" }), 
    })
    .filter({
      has: page.getByRole("cell", { name: `${expectedSalidaDate} 00:05` }), 
    })
    .filter({
      has: page.getByRole("cell", { name: `${expectedLlegadaDate} 00:05` }), 
    })

  // Verificar que la fila completa con los datos del nuevo viaje sea visible
  await expect(newTripRow).toBeVisible({ timeout: 15000 })
})
