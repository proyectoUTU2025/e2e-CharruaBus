import { test, expect } from "@playwright/test"

test("Test Case 2: Formulario incompleto o con datos inválidos", async ({ page }) => {
  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación
  await page.goto("http://localhost:4200/")

  //3.Verificar que se muestre el boton de login
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible()

  //4.Ir a la página de login
  await page.getByRole("link", { name: "Login" }).click()
  await page.waitForURL("**/login")
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible()

  //5.Iniciar sesión como administrador
  await page.getByRole("textbox", { name: "Email" }).fill("admin@test.com")
  await page.getByLabel("Contraseña", { exact: true }).fill("Admin123!$")
  await page.getByRole("button", { name: "Iniciar sesión" }).click()
  await page.waitForURL("**/home")
  await page.waitForLoadState("networkidle")

  //6.Ir al menú "Usuarios"
  await page.locator("mat-toolbar").getByRole("link", { name: "Usuarios" }).click()
  await page.waitForLoadState("networkidle")

  //7.Hacer clic en "Crear Usuario"
  await page.getByRole("button", { name: "Crear Usuario" }).click()

  // ***** INICIO: Interacción con la ventana emergente "Crear Nuevo Usuario" *****
  const crearUsuarioModal = page.locator("mat-dialog-container", { hasText: "Crear Nuevo Usuario" })
  await expect(crearUsuarioModal).toBeVisible()
  
  // Esperar explícitamente a que el primer campo de input dentro del modal ("nombre") esté visible.
  await crearUsuarioModal.locator('input[formcontrolname="nombre"]').waitFor({ state: 'visible' }); 

  //8.Completar todos los campos del formulario con datos válidos
  await crearUsuarioModal.locator('input[formcontrolname="nombre"]').fill("usuarioNuevo")

  await crearUsuarioModal.locator('input[formcontrolname="apellido"]').fill("apellidoNuevo")
  const uniqueEmail = "cliente_extra2@test.com";
  await crearUsuarioModal.locator('input[formcontrolname="email"]').fill(uniqueEmail);

  // Campo 'Tipo de Documento' es un combobox - Uso de localizador más preciso dentro del modal
  await crearUsuarioModal.locator('mat-form-field', { hasText: 'Tipo de Documento' }).getByRole("combobox").click();
  await page.getByRole("option", { name: "CEDULA" }).click()

  // Generar un número de documento aleatorio de 8 dígitos
  const randomDocumento = '25488958';
  await crearUsuarioModal.locator('input[formcontrolname="documento"]').fill(randomDocumento)

  // Selección de Fecha de Nacimiento (Diciembre 3, 2002)
  await crearUsuarioModal.getByRole("button", { name: "Open calendar" }).click()
  await page.getByRole("button", { name: "Choose month and year" }).click()
  await page.getByRole("button", { name: "2002" }).click()
  await page.getByRole("button", { name: "DIC" }).click()
  await page.getByRole("button", { name: "3 de diciembre de 2002", exact: true }).click()

  // Campo 'Rol' es un combobox - Uso de localizador más preciso dentro del modal
  await crearUsuarioModal.locator('mat-form-field', { hasText: 'Rol' }).getByRole("combobox").click();
  await page.getByRole("option", { name: "VENDEDOR" }).click()

  // Campos de Contraseña usando getByLabel
  await crearUsuarioModal.getByLabel("Contraseña", { exact: true }).fill("Vendedor12!")
  await crearUsuarioModal.getByLabel("Confirmar Contraseña").fill("Vendedor12!")
  // NUEVO: Añadir un blur explícito al campo de Confirmar Contraseña
  await crearUsuarioModal.getByLabel("Confirmar Contraseña").blur();

  // Esperar que el botón 'Guardar' esté habilitado antes de hacer clic
  await expect(crearUsuarioModal.getByRole('button', { name: 'Guardar' })).toBeEnabled();

  //9.Pulsar “Guardar”
  await crearUsuarioModal.getByRole("button", { name: "Guardar" }).click();

  //10.Verificamos el mensaje de error
  await crearUsuarioModal.getByText('Email ya registrado en el').click();

  await crearUsuarioModal.getByRole("button", { name: "Cancelar" }).click();

  // Esperar a que el modal se cierre o desaparezca
  await expect(crearUsuarioModal).not.toBeVisible()
})