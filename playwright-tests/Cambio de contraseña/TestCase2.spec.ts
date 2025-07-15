import { test, expect } from '@playwright/test';
import { getAccountPassword } from '../../utils/PasswordLoader';

const TEST_ACCOUNT = 'testUser1'; // Identificador para la cuenta de prueba

test('Test Case 2: Cancelar el cambio de contraseña', async ({ page }) => {

  const oldPassword = getAccountPassword(TEST_ACCOUNT);

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación 
  await page.goto('http://localhost:4200/');

  //3.Verificar que se muestre el boton de login
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

  //4.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //5.Verificar que se muestre el formulario de login con campos "Email" y "Contraseña"
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Contraseña' })).toBeVisible();

  //6.Ingresar un email y contraseña válidos
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('cliente2@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill(oldPassword);

  //7.Pulsar "Iniciar sesión"
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //8.Verificar que el usuario sea redirigido a la pantalla principal según su rol
  await expect(page.locator('#mat-mdc-chip-0').getByText('CLIENTE')).toBeVisible();
  await expect(page.locator('mat-toolbar').getByRole('button', { name: 'Cerrar sesión' })).toBeVisible();
  await expect(page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' })).toBeVisible();

  //9.Acceder a la sección “Mi Perfil”
  await page.locator('mat-toolbar').getByRole('link', { name: 'Mi Perfil' }).click();

  //10.Verificar que este la sección “Cambiar contraseña”
  await expect(page.getByText('Cambiar ContraseñaActualizá')).toBeVisible();
 
  //11.ngresar la contraseña actual, la nueva contraseña y su confirmación
  await page.getByText('Contraseña Actual', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña Actual' }).fill(oldPassword);
  await page.getByText('Nueva Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Nueva Contraseña', exact: true }).fill('Pepito12!');
  await page.getByText('Confirmar Nueva Contraseña').click();
  await page.getByRole('textbox', { name: 'Confirmar Nueva Contraseña' }).fill('Pepito12!');

  //12.Pulsar “Cancelar”
  await expect(page.locator('app-change-password').getByRole('button', { name: 'Cancelar' })).toBeVisible();
  await page.locator('app-change-password').getByRole('button', { name: 'Cancelar' }).click();

  //13.Verificar que los campos esten vacios
  await expect(page.getByRole('textbox', { name: 'Contraseña Actual' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Nueva Contraseña', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Confirmar Nueva Contraseña' })).toBeVisible();
});