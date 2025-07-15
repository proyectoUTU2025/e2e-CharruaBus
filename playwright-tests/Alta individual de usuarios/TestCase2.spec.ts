// import { test, expect } from '@playwright/test';

// test.describe('TC2: Formulario incompleto o con datos inválidos', () => {
//   test.beforeEach(async ({ page }) => {
//     // 1. Login como Admin
//     await page.goto('http://localhost:4200/');
//     await page.getByRole('link', { name: 'Login' }).click();
//     await page.waitForURL('**/login');
//     await page.waitForLoadState('networkidle');
//     await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
//     await page.getByLabel('Contraseña', { exact: true }).fill('Admin123!$');
//     await page.getByRole('button', { name: 'Iniciar sesión' }).click();
//     await page.waitForURL('**/home');
//     await page.waitForLoadState('networkidle');

//     // 2. Ir al menú "Usuarios" y abrir el modal
//     await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();
//     await page.waitForLoadState('networkidle');
//     const crearBtn = page.getByRole('button', { name: 'Crear Usuario' });
//     await crearBtn.waitFor({ state: 'visible', timeout: 10_000 });
//     await crearBtn.click();

//     // 3. Esperar el diálogo
//     const modal = page.locator('mat-dialog-container', { hasText: 'Crear Nuevo Usuario' });
//     await modal.waitFor({ state: 'visible', timeout: 5_000 });
//   });

//   test('❌ Campos obligatorios vacíos muestran error', async ({ page }) => {
//     const modal = page.locator('mat-dialog-container', { hasText: 'Crear Nuevo Usuario' });

//     // 4. Pulsar Guardar sin rellenar nada
//     await modal.getByRole('button', { name: 'Guardar' }).click();

//     // 5. Verificar errores de "requerido" en varios campos
//     await expect(modal.locator('mat-error', { hasText: /requerido/i }).nth(0)).toBeVisible(); // nombre
//     await expect(modal.locator('mat-error', { hasText: /requerido/i }).nth(1)).toBeVisible(); // apellido
//     await expect(modal.locator('mat-error', { hasText: /requerido/i }).nth(2)).toBeVisible(); // email

//     // 6. Llenar sólo el nombre correctamente
//     await modal.locator('input[formcontrolname="nombre"]').fill('Juan');
//     // volver a pulsar Guardar
//     await modal.getByRole('button', { name: 'Guardar' }).click();

//     // 7. El error de nombre ya no aparece, pero siguen los de los otros campos
//     await expect(modal.locator('mat-error', { hasText: /requerido/i })).toHaveCount(2);
//     // Y el campo nombre sigue con 'Juan'
//     await expect(modal.locator('input[formcontrolname="nombre"]')).toHaveValue('Juan');
//   });

//   test('❌ Email inválido muestra mensaje de formato', async ({ page }) => {
//     const modal = page.locator('mat-dialog-container', { hasText: 'Crear Nuevo Usuario' });

//     // 8. Rellenar algunos campos válidos, dejar el email con formato inválido
//     await modal.locator('input[formcontrolname="nombre"]').fill('María');
//     await modal.locator('input[formcontrolname="apellido"]').fill('Pérez');
//     await modal.locator('input[formcontrolname="email"]').fill('correo-sin-arroba.com');

//     // 9. Pulsar Guardar
//     await modal.getByRole('button', { name: 'Guardar' }).click();

//     // 10. Verificar mensaje de error de email inválido
//     await expect(modal.locator('mat-error', { hasText: /correo electrónico no es válido/i })).toBeVisible();

//     // 11. Los campos válidos deben conservar su valor
//     await expect(modal.locator('input[formcontrolname="nombre"]')).toHaveValue('María');
//     await expect(modal.locator('input[formcontrolname="apellido"]')).toHaveValue('Pérez');
//     // Y el email inválido también permanece para que el usuario lo corrija
//     await expect(modal.locator('input[formcontrolname="email"]')).toHaveValue('correo-sin-arroba.com');
//   });
// });
