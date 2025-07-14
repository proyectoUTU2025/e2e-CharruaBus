import { test, expect } from "@playwright/test"

// Función para calcular el dígito verificador de una cédula uruguaya
function calculateCedulaVerifier(sevenDigits: string): string {
  const factors = [2, 9, 8, 7, 6, 3, 4];
  let sum = 0;

  for (let i = 0; i < 7; i++) {
    sum += parseInt(sevenDigits[i]) * factors[i];
  }

  const remainder = sum % 10;
  const verifierDigit = remainder === 0 ? 0 : 10 - remainder;

  return verifierDigit.toString();
}

test("Test Case 1: Alta exitosa de nuevo usuario", async ({ page }) => {
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
  await page.getByRole("textbox", { name: "Email" }).fill("admin@admin.com")
  await page.getByLabel("Contraseña", { exact: true }).fill("admin")
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

  const randomString = Math.random().toString(36).substring(2, 15);
  const uniqueEmail = `usuarioNuevo_${randomString}@test.com`;
  await crearUsuarioModal.locator('input[formcontrolname="email"]').fill(uniqueEmail);

  // Campo 'Tipo de Documento' es un combobox - Uso de localizador más preciso dentro del modal
  await crearUsuarioModal.locator('mat-form-field', { hasText: 'Tipo de Documento' }).getByRole("combobox").click();
  await page.getByRole("option", { name: "CEDULA" }).click()

  // GENERACIÓN DEL DOCUMENTO (CÉDULA) CON DÍGITO VERIFICADOR VÁLIDO
  const firstSevenDigits = Math.floor(1000000 + Math.random() * 9000000).toString(); // Genera 7 dígitos aleatorios
  const verifierDigit = calculateCedulaVerifier(firstSevenDigits);
  const randomDocumento = firstSevenDigits + verifierDigit; // Concatena para formar el número de 8 dígitos

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
  // Añadir un blur explícito al campo de Confirmar Contraseña
  await crearUsuarioModal.getByLabel("Confirmar Contraseña").blur();

  // Esperar que el botón 'Guardar' esté habilitado antes de hacer clic
  await expect(crearUsuarioModal.getByRole('button', { name: 'Guardar' })).toBeEnabled();

  //9.Pulsar “Guardar”
  await crearUsuarioModal.getByRole("button", { name: "Guardar" }).click();
  // Esperar a que el modal se cierre o desaparezca
  await expect(crearUsuarioModal).not.toBeVisible()
  // ***** FIN: Interacción con la ventana emergente "Crear Nuevo Usuario" *****

  //10.Verificar que el nuevo usuario aparece en la lista de usuarios
  await page.getByRole("textbox", { name: "Documento" }).fill(randomDocumento)
  await page.getByRole("button", { name: "Buscar" }).click()
  await page.waitForLoadState("networkidle")

  await expect(page.getByRole("cell", { name: "usuarioNuevo", exact: true })).toBeVisible()
  await expect(page.getByRole("cell", { name: randomDocumento })).toBeVisible()
})