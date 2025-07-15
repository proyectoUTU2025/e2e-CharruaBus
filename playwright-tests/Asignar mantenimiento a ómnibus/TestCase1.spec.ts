import { test, expect } from '@playwright/test';

test('TC1: Asignar mantenimiento a ómnibus', async ({ page, browserName }) => {
    // Puedes skipear navegadores específicos si fuera necesario:
    // test.skip(browserName === 'webkit', 'Problemas con Webkit');

    // 1. Ir al login
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();

    // 2. Iniciar sesión como vendedor
    await page.getByRole('textbox', { name: 'Email' }).fill('vendedor@test.com');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Vend123!$');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // 3. Ir a la sección Ómnibus
    await page.locator('mat-toolbar').getByRole('link', { name: 'Ómnibus' }).click();

    // 4. Esperar la tabla de buses y buscar la fila
    await page.waitForSelector('table', { timeout: 10000 });
    const busRow = page.getByRole('row', { name: /AAA-1111/ }); // Usá el dominio de la patente
    await expect(busRow).toBeVisible({ timeout: 15000 });

    // 5. Esperar que NO haya overlays (por si quedó alguno de Angular Material)
    await page.waitForSelector('.cdk-overlay-backdrop', { state: 'hidden', timeout: 10000 });

    // 6. Abrir el menú de acciones del ómnibus
    await busRow.getByRole('button').first().click();

    // 7. Click en "Asignar Mantenimiento"
    await page.getByRole('button', { name: 'Asignar Mantenimiento' }).click();

    // 8. Completar el formulario de mantenimiento
    const dialog = page.locator('mat-dialog-container');
    await expect(dialog).toBeVisible({ timeout: 7000 });

    await dialog.getByRole('textbox', { name: 'Motivo' }).fill('rueda');

    // Seleccionar fecha de inicio
    await dialog.locator('mat-form-field', { hasText: 'Fecha de inicio' }).getByLabel('Open calendar').click();
    await page.getByRole('button', { name: /16 de julio de/ }).click();

    // Seleccionar fecha de fin
    await dialog.locator('mat-form-field', { hasText: 'Fecha de fin' }).getByLabel('Open calendar').click();
    await page.getByRole('button', { name: /17 de julio de/ }).click();

    // Seleccionar hora de fin
    await dialog.getByRole('combobox', { name: 'Hora de fin' }).click();
    await page.getByRole('option', { name: '08:35' }).click();

    // 9. Confirmar la asignación
    await dialog.getByRole('button', { name: 'Asignar mantenimiento', exact: true }).click();

    // 10. Validar mensaje de éxito
    await expect(page.getByText('Mantenimiento creado con éxito')).toBeVisible({ timeout: 7000 });

    // 11. Validar que aparece la etiqueta en la tabla
    await expect(page.getByRole('cell', { name: 'MANTENIMIENTO' })).toBeVisible({ timeout: 7000 });

    // 12. Validar fechas (ajusta si tus datos de prueba cambian)
    await expect(page.getByRole('cell', { name: '/07/2025 08:55' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '/07/2025 08:35' })).toBeVisible();
});
