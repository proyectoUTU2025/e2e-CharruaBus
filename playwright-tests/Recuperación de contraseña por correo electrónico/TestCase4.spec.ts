import { test, expect} from '@playwright/test';
import { promptUser } from "../../utils/prompt"

test('Test Case 4: Nueva contraseña igual a la anterior', async ({ page }) => {

  //1.Lanzar el navegador
  //2.Navegar a la URL de la aplicación  
  await page.goto('http://localhost:4200/');

  //3.Ir a la página de login
  await page.getByRole('link', { name: 'Login' }).click();

  //4.Hacer clic en “¿Olvidó su contraseña?”
  await page.getByText('¿Olvidaste tu contraseña?').click();

  //5.Ingresar un correo válido y registrado
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('gameftjp@gmail.com');

  //6.Pulsar “Enviar código”
  await page.getByRole('button', { name: 'Enviar código' }).click();

  //7.Ingresar el codigo de verificación
  await page.pause()

  //8.Presionar "Verificar Código" para verificar que el codigo sea valido
  await page.getByRole('button', { name: 'Verificar Código' }).click();
  await page.waitForLoadState("networkidle")

  //9.Ingresar la misma contraseña anterior como nueva
  await page.getByText('Nueva Contraseña', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Nueva Contraseña' }).fill('Pepito12!');
  await page.getByText('Confirmar Contraseña').click();
  await page.getByRole('textbox', { name: 'Confirmar Contraseña' }).fill('Pepito12!');

  //10.Presiona "Cambiar Contraseña"
  await page.getByRole('button', { name: 'Cambiar Contraseña' }).click();

  //11.Verificar que se muestra el mensaje: “La nueva contraseña debe ser distinta a la anterior”
  await expect(page.getByText('La nueva contraseña debe ser')).toBeVisible();
});