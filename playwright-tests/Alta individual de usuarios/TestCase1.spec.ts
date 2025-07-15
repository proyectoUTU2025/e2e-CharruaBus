import { test, expect } from "@playwright/test";

// Función para calcular el dígito verificador de una cédula uruguaya
function calculateCedulaVerifier(sevenDigits: string): string {
  const factors = [2, 9, 8, 7, 6, 3, 4];
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    sum += parseInt(sevenDigits[i], 10) * factors[i];
  }
  const remainder = sum % 10;
  return (remainder === 0 ? 0 : 10 - remainder).toString();
}

test("TC1: Alta exitosa de nuevo usuario", async ({ page, browserName }) => {
  // Skip en Chromium y WebKit por inestabilidad de elementos
  test.skip(browserName === "chromium", "Flaky en Chromium, se omite este test");
  test.skip(browserName === "webkit", "Flaky en WebKit, se omite este test");

  // 1. Login como Admin
  await page.goto("http://localhost:4200/");
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
  await page.getByRole("link", { name: "Login" }).click();
  await page.waitForURL("**/login");
  await page.waitForLoadState("networkidle");
  await page.getByRole("textbox", { name: "Email" }).fill("admin@test.com");
  await page.getByLabel("Contraseña", { exact: true }).fill("Admin123!$");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await page.waitForURL("**/home");
  await page.waitForLoadState("networkidle");

  // 2. Ir al menú "Usuarios"
  await page.locator("mat-toolbar").getByRole("link", { name: "Usuarios" }).click();
  await page.waitForLoadState("networkidle");

  // 3. Abrir el modal de creación
  const crearBtn = page.getByRole("button", { name: "Crear Usuario" });
  await crearBtn.waitFor({ state: "visible", timeout: 10_000 });
  await expect(crearBtn).toBeEnabled();
  await crearBtn.scrollIntoViewIfNeeded();
  await crearBtn.click();

  // 4. Interacción con el modal "Crear Nuevo Usuario"
  const modal = page.locator("mat-dialog-container", { hasText: "Crear Nuevo Usuario" });
  await modal.waitFor({ state: "visible", timeout: 5_000 });

  // Rellenar campos
  await modal.locator('input[formcontrolname="nombre"]').fill("usuarioNuevo");
  await modal.locator('input[formcontrolname="apellido"]').fill("apellidoNuevo");

  const uniqueEmail = `usuario_${Date.now()}@test.com`;
  await modal.locator('input[formcontrolname="email"]').fill(uniqueEmail);

  // Tipo de Documento
  await modal
    .locator('mat-form-field', { hasText: "Tipo de Documento" })
    .getByRole("combobox")
    .click();
  await page.getByRole("option", { name: "CEDULA" }).click();

  // Documento con dígito verificador
  const seven = Math.floor(1_000_000 + Math.random() * 9_000_000).toString();
  const documento = seven + calculateCedulaVerifier(seven);
  await modal.locator('input[formcontrolname="documento"]').fill(documento);

  // Fecha de Nacimiento
  await modal.getByRole("button", { name: "Open calendar" }).click();
  await page.getByRole("button", { name: "Choose month and year" }).click();
  await page.getByRole("button", { name: "2002" }).click();
  await page.getByRole("button", { name: "DIC" }).click();
  await page
    .getByRole("button", { name: "3 de diciembre de 2002", exact: true })
    .click();

  // Rol
  await modal
    .locator('mat-form-field', { hasText: "Rol" })
    .getByRole("combobox")
    .click();
  await page.getByRole("option", { name: "VENDEDOR" }).click();

  // Contraseña y confirmación
  await modal.getByLabel("Contraseña", { exact: true }).fill("Vendedor12!");
  await modal.getByLabel("Confirmar Contraseña").fill("Vendedor12!");
  await modal.getByLabel("Confirmar Contraseña").blur();

  // Guardar y esperar cierre del modal
  const guardarBtn = modal.getByRole("button", { name: "Guardar" });
  await expect(guardarBtn).toBeEnabled();
  await guardarBtn.click();
  await expect(modal).toBeHidden({ timeout: 10_000 });

  // 5. Buscar al usuario reciente
  const docInput = page.getByRole("textbox", { name: "Documento" }).first();
  await docInput.waitFor({ state: "visible", timeout: 10_000 });
  await docInput.fill(documento);
  await page.getByRole("button", { name: "Buscar" }).click();
  await page.waitForLoadState("networkidle");

  // 6. Verificar en tabla
  await expect(page.getByRole("cell", { name: "usuarioNuevo", exact: true })).toBeVisible();
  await expect(page.getByRole("cell", { name: documento })).toBeVisible();
});
