import { test, expect } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'http://localhost:4200';

test.describe('CU 5.3 – Historial de pasajes (con resultados)', () => {
    test('TC1 – Visualización de historial de pasajes con resultados', async ({ page }) => {
        test.setTimeout(60_000);

        // 1) Login como cliente con pasajes
        await page.goto(baseURL);
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('cliente@test.com');
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('Cli123!$');
        await Promise.all([
            page.waitForURL('**/'),
            page.getByRole('button', { name: 'Iniciar sesión' }).click(),
        ]);

        // 2) Acceder a “Mis pasajes”
        await Promise.all([
            page.waitForURL('**/mis-pasajes'),
            page.getByRole('link', { name: 'Mis pasajes' }).click(),
        ]);

        // 3) Verificar que se listan al menos dos filas, orden descendente (precio/fecha)
        const filas = page.locator('table tbody tr');
        await expect(filas).toHaveCountGreaterThan(1);
        // Ejemplo: comprobar que la primera fila es la más reciente
        await expect(filas.first()).toContainText('2025');

        // 4) Seleccionar la primera fila y abrir detalle
        await filas.first().getByRole('button', { name: /detalle/i }).click();

        // 5) Validar diálogo de detalle
        const dlg = page.locator('mat-dialog-container').last();
        await expect(dlg.getByRole('heading', { name: /Detalle del Pasaje/ })).toBeVisible();
        await expect(dlg).toContainText('Terminal Tres Cruces');        // origen
        await expect(dlg).toContainText('Punta del Este');             // destino
        await expect(dlg).toContainText('100.00');                     // precio
        await expect(dlg).toContainText('Asiento');                    // tipo de asiento
        await expect(dlg).toContainText(/CONFIRMADO|DEVUELTO/);        // estado

        // 6) Cerrar diálogo
        await dlg.getByRole('button', { name: /Cerrar/ }).click();
    });
});
