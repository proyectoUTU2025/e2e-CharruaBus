import { test, expect } from '@playwright/test';

test('TC1: Desactivación exitosa de una cuenta de usuario', async ({ page }) => {
  // 1. Login como Admin
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByLabel('Contraseña', { exact: true }).fill('Admin123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForURL('**/home');
  await page.waitForLoadState('networkidle');

  // 2. Ir al menú "Usuarios"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();
  await page.waitForLoadState('networkidle');

  // 3. Esperar a que la tabla esté renderizada
  await page.waitForSelector('table');

  // 4. Localizar directamente la celda con el documento
  const documento = '75412846';
  const docCell = page.getByRole('cell', { name: documento });
  await expect(docCell).toBeVisible({ timeout: 10_000 });

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

  // 9. Verificar que el estado cambió a "Inactivo"
  const inactivoCell = userRow.getByRole('cell', { name: 'Inactivo', exact: true });
  await expect(inactivoCell).toBeVisible();
});
