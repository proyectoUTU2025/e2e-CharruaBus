import { test, expect } from '@playwright/test';

test('Test Case 1: Desactivación exitosa de una cuenta de usuario', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación  
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como administrador
  await page.getByText('Email').click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('admin');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Ir al menú "Usuarios"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();

  //6.Buscar y seleccionar el usuario que se desea desactivar
  await page.getByRole('textbox', { name: 'Documento' }).click();
  await page.getByRole('textbox', { name: 'Documento' }).fill('75412846');

  //7.Pulsar el boton "Buscar".
  await page.getByRole('button', { name: 'Buscar' }).click();

  //8.Verificar que se el usuario este Activo
  await expect(page.getByText('Activo')).toBeVisible();

  //9.Seleccionar la opción "Desactivar".
  await page.getByRole('button').filter({ hasText: 'person_off' }).click();

  //10.Confirmar la acción de desactivar el usuario.
  await page.getByRole('button', { name: 'Confirmar' }).click();

  //11.Verificar que la cuenta del usuario es marcada como inactiva en el sistema.
  const documentNumber = "75412846";
  const userRow = page.locator('tr').filter({ has: page.getByRole("cell", { name: documentNumber, exact: true }) });
  const inactiveStatusCell = userRow.getByRole("cell", { name: "Inactivo", exact: true });
  await expect(inactiveStatusCell).toBeVisible();
});