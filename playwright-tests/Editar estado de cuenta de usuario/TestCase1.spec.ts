import { test, expect } from '@playwright/test';

test('TC1: Desactivación exitosa de una cuenta de usuario', async ({ page }) => {
  // 1. Login como Admin
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como administrador
  await page.getByText('Email').click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Admin123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForURL('**/home');
  await page.waitForLoadState('networkidle');

  // 2. Ir al menú "Usuarios"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();

  //6.Buscar y seleccionar el usuario que se desea desactivar
  await page.getByRole('textbox', { name: 'Documento' }).click();
  await page.getByRole('textbox', { name: 'Documento' }).fill('54687133');

  // 5. Subir al <tr> padre
  const userRow = docCell.locator('xpath=ancestor::tr');
  await expect(userRow).toBeVisible();

  // 6. Verificar estado inicial "Activo"
  const activoCell = userRow.getByRole('cell', { name: 'Activo', exact: true });
  await expect(activoCell).toBeVisible();

  // 7. Clic en el icono "person_off" para desactivar
  await userRow.getByRole('button', { name: /person_off/i }).click();

  // 8. Confirmar la acción en el diálogo
  await expect(page.getByText('¿Está seguro de que desea')).toBeVisible();
  await page.getByRole('button', { name: 'Confirmar' }).click();

  //11.Verificar que la cuenta del usuario es marcada como inactiva en el sistema.
  const documentNumber = "54687133";
  const userRow = page.locator('tr').filter({ has: page.getByRole("cell", { name: documentNumber, exact: true }) });
  const inactiveStatusCell = userRow.getByRole("cell", { name: "Inactivo", exact: true });
  await expect(inactiveStatusCell).toBeVisible();
});
