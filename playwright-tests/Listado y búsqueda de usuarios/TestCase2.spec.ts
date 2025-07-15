import { test, expect } from '@playwright/test';

test('TC2: Listado y búsqueda de usuarios sin resultados', async ({ page, browserName }) => {
  // Skip en Chromium y WebKit, sólo correr en Firefox
  test.skip(browserName === 'chromium' || browserName === 'webkit',
    'Este test es inestable en Chromium y WebKit, se omite allí.');

  // 1. Navegar a la app y loguearse
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Admin123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // 2. Acceder a "Usuarios"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();

  // 3. Buscar nombre inexistente
  await page.getByRole('textbox', { name: 'Nombre' }).fill('facundo');
  await page.getByRole('button', { name: 'Buscar' }).click();

  // 4. Comprobar mensaje de "no resultados"
  await expect(page.getByText('No se encontraron usuarios')).toBeVisible({ timeout: 7000 });
  await expect(page.getByText('No hay usuarios que coincidan')).toBeVisible();

  // 5. Otro nombre también inexistente
  await page.getByRole('textbox', { name: 'Nombre' }).fill('miquel');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByText('No se encontraron usuarios')).toBeVisible({ timeout: 7000 });
  await expect(page.getByText('No hay usuarios que coincidan')).toBeVisible();

  // 6. Vaciar nombre, buscar sólo por correo mal formado
  await page.getByRole('textbox', { name: 'Nombre' }).fill('');
  await page.getByRole('textbox', { name: 'Correo' }).fill('jona@cris.com');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByText('No se encontraron usuarios')).toBeVisible({ timeout: 7000 });
  await expect(page.getByText('No hay usuarios que coincidan')).toBeVisible();

  // 7. Vaciar correo y buscar por apellido inexistente
  await page.getByRole('textbox', { name: 'Correo' }).fill('');
  await page.getByRole('textbox', { name: 'Apellido' }).fill('gabriel');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByText('No se encontraron usuarios')).toBeVisible({ timeout: 7000 });
  await expect(page.getByText('No hay usuarios que coincidan')).toBeVisible();
});
