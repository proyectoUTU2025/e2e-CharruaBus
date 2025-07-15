import { test, expect } from '@playwright/test';

const BASE = process.env.BASE_URL || 'http://localhost:4200';

test('CU 4.11 – No se puede comprar tras cierre automático de ventas y se notifica', async ({ page, request }) => {
    // 1) Login como vendedor
    await page.goto(BASE);
    await page.click('text=Login');
    await page.fill('input[formcontrolname="email"]', 'vendedor@test.com');
    await page.fill('input[formcontrolname="password"]', 'Vend123!$');
    await Promise.all([
        page.waitForURL('**/'),
        page.click('button:has-text("Iniciar sesión")'),
    ]);

    // 2) Crear un viaje que expire en 1 minuto (vía API de test)
    //    Se asume que tienes un endpoint en modo test para esto:
    const viaje = await request.post(`${BASE}/api/test/create-viaje`, {
        data: {
            origenId: 1,
            destinoId: 2,
            fechaSalida: new Date(Date.now() + 60 * 1000).toISOString(),
            precio: 100,
            capacidad: 10
        }
    }).then(r => r.json());

    // 3) Vender un pasaje a un cliente (vía API):
    await request.post(`${BASE}/api/viajes/${viaje.id}/pasajes`, {
        data: { clienteId: 3 }
    });

    // 4) Avanzar el reloj 2 minutos (vía API de test):
    await request.post(`${BASE}/api/test/advance-clock`, {
        data: { minutes: 2 }
    });

    // 5) Disparar manualmente el job de cierre (modo test)
    await request.post(`${BASE}/api/admin/jobs/trigger`, {
        data: { job: 'cierre-ventas' }
    });

    // 6) Intentar comprar desde UI: ya no debe verse el botón “Comprar”
    await page.goto(`${BASE}/viajes/${viaje.id}`);
    await expect(page.locator('button:has-text("Comprar pasaje")')).toHaveCount(0);

    // 7) Comprobar notificación de cierre en la bandeja del cliente
    //    (se asume que estás logueado como el mismo cliente, o puedes loguearte aquí)
    await page.goto(`${BASE}/notificaciones`);
    await expect(page.locator('text=Ventas cerradas para el viaje')).toBeVisible();
});
