# Page snapshot

```yaml
- img "Logo"
- text: CharruaBus
- link "Login":
  - /url: /login
- img "Charrua Bus"
- heading "Bienvenido de nuevo" [level=1]
- paragraph: Introduce tus credenciales para iniciar sesión en tu cuenta
- text: Email
- textbox "Email"
- text: Contraseña
- textbox "Contraseña"
- button "Mostrar/ocultar contraseña"
- button "Iniciar sesión" [disabled]
- text: ¿No tienes cuenta? Regístrate ¿Olvidaste tu contraseña? Solicitá una nueva
- dialog:
  - heading "Alta Masiva de Localidades" [level=2]
  - paragraph: Cargue un archivo CSV con los datos de las localidades que desea crear.
  - paragraph: Arrastre y suelte su archivo CSV aquí
  - paragraph: o haga clic para seleccionar un archivo
  - paragraph:
    - text: ¿No tiene un archivo CSV?
    - button "DESCARGAR PLANTILLA"
  - button "Cancelar"
  - button "Procesar Archivo" [disabled]
```