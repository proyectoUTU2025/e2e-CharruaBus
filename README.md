# CharruaBus – Testing E2E con Playwright

Este proyecto contiene las pruebas automatizadas E2E (end-to-end) para la aplicación CharruaBus, desarrolladas con [Playwright](https://playwright.dev/).

Estas pruebas aseguran la calidad y correcto funcionamiento de los casos de uso críticos del sistema, verificando que el flujo de usuario completo funcione tal como se espera.

---

## Contenido

- [Prerequisitos](#prerequisitos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Preparación del entorno](#preparación-del-entorno)
- [Seed de datos para E2E](#seed-de-datos-para-e2e)
- [Cómo ejecutar los tests](#cómo-ejecutar-los-tests)
- [Buenas prácticas y convenciones](#buenas-prácticas-y-convenciones)
- [Preguntas frecuentes](#preguntas-frecuentes)

---

## Prerequisitos

1. **Node.js** v18+ (recomendado)  
2. **pnpm** (o alternativamente npm/yarn)  
3. **Playwright** (ya está en las dependencias del proyecto)  
4. Acceso al **backend** y **frontend** de CharruaBus (ver instrucciones de ejecución más abajo)  
5. Tener las variables de entorno (usuarios de prueba, base de datos) correctamente configuradas  

---

## Estructura del proyecto

```
/
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── scripts/
│   └── seed.ts
├── tests/
│   ├── auth/
│   │   ├── cu_1_1_login.spec.ts
│   │   ├── cu_1_2_logout.spec.ts
│   ├── profile/
│   │   ├── cu_1_3_editProfile.spec.ts
│   ├── helpers/
│   │   ├── authHelper.ts
│   │   ├── profileHelper.ts
│   ├── fixtures/
│   │   ├── users.json
│   └── ...
├── screenshots/
└── ...
```

- Los archivos `.spec.ts` están nombrados con el prefijo **CU** para fácil trazabilidad entre tests y casos de uso del sistema.  
- El script `scripts/seed.ts` inicializa la base de datos de pruebas con los usuarios necesarios.

---

## Preparación del entorno

### 1. Clonar el repositorio

```sh
git clone <repo-url>
cd charruabus-e2e
```

### 2. Instalar dependencias

Con `pnpm` (recomendado):

```sh
pnpm install
```

O con `npm`:

```sh
npm install
```

### 3. Crear archivo de entorno

En la raíz del proyecto, crea un archivo `.env` con:

```dotenv
E2E_DATABASE_URL=postgres://user:pass@localhost:5432/charruabus
BASE_URL=http://localhost:4200
```

### 4. Levantar el backend

Desde la carpeta del backend:

```sh
./mvnw spring-boot:run
```

O con Maven instalado:

```sh
mvn spring-boot:run
```

Verifica que el endpoint `/api/auth/login` responde correctamente.

### 5. Levantar el frontend

Desde la carpeta del frontend:

```sh
pnpm install
pnpm start
```

O:

```sh
npm install
npm start
```

Verifica que puedes acceder a la app en [http://localhost:4200](http://localhost:4200).

---

## Seed de datos para E2E

Para garantizar que todos los colaboradores tengan siempre disponibles los mismos usuarios de prueba, incluimos un script de seed:

1. **Ubicación**: `scripts/seed.ts`

2. **Funcionalidad**:
   - Crea la extensión `pgcrypto` en Postgres para `crypt()`.  
   - Inserta un usuario **<admin@admin.com>** con rol ADMIN.  
   - Inserta un usuario **<usuario@ejemplo.com>** con rol CLIENTE.  
   - Usa `ON CONFLICT DO NOTHING` para no duplicar registros.

3. **Uso**:

   ```sh
   # Instala dependencias si aún no lo has hecho
   npm install pg dotenv
   npm install -D ts-node @types/node

   # Ejecuta el seed
   npx ts-node scripts/seed.ts
   ```

4. **Automatización**:  
   Hemos agregado estos scripts en `package.json` para ejecutar el seed antes de los tests:

   ```json
   {
     "scripts": {
       "seed": "ts-node scripts/seed.ts",
       "test:e2e": "npm run seed && npx playwright test",
       "test": "npm run test:e2e"
     }
   }
   ```

   Ahora, con:

   ```sh
   pnpm test
   ```

   (o `npm test`) se realiza primero el seed y luego se corren todos los tests E2E.

---

## Cómo ejecutar los tests

### Ejecutar todos los tests

```sh
pnpm test
```

En modo headed (ver los tests en el navegador):

```sh
pnpm test:headed
```

En modo debug interactivo:

```sh
pnpm test:debug
```

Para ejecutar tests específicos:

```sh
pnpm test tests/auth/cu_1_1_login.spec.ts
```

### Reportes y screenshots

- Reporte HTML en `playwright-report/`.  
- Screenshots de los tests en `screenshots/`.

---

## Buenas prácticas y convenciones

- Helpers y fixtures en `tests/helpers/` y `tests/fixtures/`.  
- Nombres de archivos `.spec.ts` con el prefijo CU para trazabilidad.  
- Usa selectores robustos (`getByRole`, `data-testid`).  
- Si agregas nuevos usuarios de prueba, recuerda actualizar `scripts/seed.ts`.  
- Agrega capturas de pantalla en pasos críticos para facilitar debugging.

---

## Preguntas frecuentes

### ¿Qué pasa si falla un test de login?

- Verifica que el usuario existe en la DB y la contraseña es la correcta.  
- Asegúrate de que backend y frontend estén corriendo y accesibles.

### ¿Puedo correr los tests en otros entornos (staging, producción)?

- Sí, redefine `BASE_URL` y asegúrate de ejecutar el seed contra la BD de ese entorno.

### ¿Dónde configuro los browsers soportados?

- En `playwright.config.ts` puedes habilitar o deshabilitar navegadores (Chromium, Firefox, WebKit).

### ¿Cómo agregar un nuevo test?

- Crea un nuevo archivo en la carpeta correspondiente, con el prefijo CU, usando los helpers/fixtures existentes.

# Reporte Allure

Además del reporte HTML clásico, puedes generar un reporte avanzado y navegable usando **Allure**:

## 1. Corre los tests normalmente

```sh
pnpm test
```

## 2. Genera el reporte Allure

```sh
pnpm run allure:generate
```

## 3. Visualiza el reporte localmente

```sh
pnpm run allure:open
```

Esto abrirá el reporte interactivo en tu navegador.

> **Nota:** Los resultados se generan en `allure-results/` y el reporte listo para abrir queda en `allure-report/`.

---

## Contacto

Para dudas o sugerencias, contacta al equipo de CharruaBus o revisa la documentación interna del proyecto.
