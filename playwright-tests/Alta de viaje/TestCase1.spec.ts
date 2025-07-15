import { test, expect } from "@playwright/test";

test("Test Case 1: Alta exitosa de un nuevo viaje", async ({ page }) => {
  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación
  await page.goto("http://localhost:4200/");

  //3.Ir a la página de login
  await page.getByRole("link", { name: "Login" }).click();
  await page.waitForURL("**/login"); // Esperar a que la URL sea la de login
  await page.waitForLoadState("networkidle"); // Esperar a que la red esté inactiva después de la navegación a login
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible(); // Asegurar que el campo de email es visible

  //4.Iniciar sesión como vendedor
  await page.getByRole("textbox", { name: "Email" }).fill("vendedor@test.com");
  await page.getByLabel("Contraseña", { exact: true }).fill("Vend123!$"); // Mejor usar getByLabel para Contraseña
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await page.waitForURL("**/home"); // Esperar a que la URL sea la de home después del login
  await page.waitForLoadState("networkidle"); // Esperar a que la red esté inactiva después del login

  //5.Seleccionar "Viajes" en la barra de navegación y presionar el botón "Crear viaje"
  await page.locator("mat-toolbar").getByRole("link", { name: "Viajes" }).click();
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Crear Viaje" }).click();

  const altaViajeModal = page.locator("mat-dialog-container", { hasText: "Alta de Viaje" });
  await expect(altaViajeModal).toBeVisible();
  

  //6.Completar todos los campos requeridos del viaje
  await altaViajeModal.locator("mat-form-field", { hasText: "Origen" }).getByRole("combobox").click();
  await page.getByRole("option", { name: "MALDONADO - Punta del Este"}).click();

  await altaViajeModal.locator("mat-form-field", { hasText: "Destino" }).getByRole("combobox").click();
  await page.getByRole("option", { name: "MONTEVIDEO - Terminal Tres Cruces" }).click();

  // Campos de fecha dentro del modal
  await altaViajeModal.locator("mat-form-field", { hasText: "Fecha salida" }).getByLabel("Open calendar").click();
  await page.getByRole("button", { name: "15 de julio de 2025" }).click(); 

  await altaViajeModal.locator("mat-form-field", { hasText: "Fecha llegada" }).getByLabel("Open calendar").click();
  await page.getByRole("button", { name: "15 de julio de 2025" }).click(); 

  // Horas dentro del modal
  await altaViajeModal.locator("mat-form-field", { hasText: "Hora de salida" }).getByRole("combobox").click();
  await page.getByRole("option", { name: "11:10" }).click();

  await altaViajeModal.locator("mat-form-field", { hasText: "Hora de llegada" }).getByRole("combobox").click();
  await page.getByRole("option", { name: "12:00" }).click();

  // Precio base dentro del modal
  await altaViajeModal.getByRole("spinbutton", { name: "Precio base" }).fill("1200");

  // Botones "Siguiente" y "Continuar" dentro del modal o la página activa
  await altaViajeModal.getByRole("button", { name: "Siguiente" }).click();
  await altaViajeModal.getByRole("button", { name: "Siguiente" }).click(); 
  await altaViajeModal.getByRole("button", { name: "Seleccionar" }).first().click(); 
  await altaViajeModal.getByRole("button", { name: "Continuar" }).click(); 

  //7.Registrar el viaje con los datos proporcionados.
  await altaViajeModal.getByRole("button", { name: "Registrar viaje" }).click();

  //8.Verificar que los datos del nuevo viaje se guardan en el sistema
  await expect(page.getByRole('cell', { name: 'MONTEVIDEO - Terminal Tres Cruces' }).first()).toBeVisible();
});