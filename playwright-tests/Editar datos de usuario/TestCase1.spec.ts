import { test, expect } from '@playwright/test';

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

test('Test Case 1: Modificación exitosa de datos de usuario por el administrador', async ({ page }) => {

  const firstSevenDigits = Math.floor(1000000 + Math.random() * 9000000).toString(); // Genera 7 dígitos aleatorios
  const verifierDigit = calculateCedulaVerifier(firstSevenDigits);
  const randomDocumento = firstSevenDigits + verifierDigit; // Concatena para formar el número de 8 dígitos  

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación   
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Iniciar sesión como administrador
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByText('Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Admin123!$');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  //5.Ir al menú "Usuarios"
  await page.locator('mat-toolbar').getByRole('link', { name: 'Usuarios' }).click();

  //6.Modificar uno o varios campos del formulario con datos válidos y correctos
  await page.getByRole('row', { name: '7 Cliente3 Test 03/03/1992' }).getByRole('button').first().click();
  const editarUsuarioModal = page.locator('mat-dialog-container', { hasText: 'Editar Usuario' });
  await expect(editarUsuarioModal).toBeVisible(); // Asegurarse de que el modal es visible

  // Luego, interactuamos con el campo 'Apellido' DENTRO de ese modal
  await editarUsuarioModal.getByRole('textbox', { name: 'Documento' }).click();
  await editarUsuarioModal.getByRole('textbox', { name: 'Documento' }).fill(randomDocumento);

  //7.Presionar el botón "Guardar"
  await page.getByRole('button', { name: 'Guardar' }).click();

  //8.Verificar que el sistema actualiza los datos
  await expect(page.getByRole('cell', { name: randomDocumento })).toBeVisible();
});