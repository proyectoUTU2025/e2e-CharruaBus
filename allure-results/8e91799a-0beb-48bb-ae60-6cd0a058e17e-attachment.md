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
- textbox "Email": admin@test.com
- text: Contraseña
- textbox "Contraseña": Admin123!$
- button "Mostrar/ocultar contraseña"
- button "Iniciar sesión"
- text: "Error inesperado: could not execute statement [ERROR: duplicate key value violates unique constraint \"token_pkey\" Detail: Key (id)=(1) already exists.] [insert into token (es_token_refresco,fecha_emision,revocado,tipo_dispositivo,token,token_type,usuario_id) values (?,?,?,?,?,?,?)]; SQL [insert into token (es_token_refresco,fecha_emision,revocado,tipo_dispositivo,token,token_type,usuario_id) values (?,?,?,?,?,?,?)]; constraint [token_pkey] ¿No tienes cuenta? Regístrate ¿Olvidaste tu contraseña? Solicitá una nueva"
```