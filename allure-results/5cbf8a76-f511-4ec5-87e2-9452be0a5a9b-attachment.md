# Page snapshot

```yaml
- dialog:
  - heading "Crear Nuevo Usuario" [level=2]
  - text: Nombre
  - textbox "Nombre": usuarioNuevo
  - text: Apellido
  - textbox "Apellido": apellidoNuevo
  - text: Correo
  - textbox "Correo": usuarioNuevo_fgv5svondq@test.com
  - text: Tipo de Documento
  - combobox "Tipo de Documento": CEDULA
  - text: Documento
  - textbox "Documento": "97770844"
  - text: Fecha de Nacimiento
  - textbox "Fecha de Nacimiento": 3/12/2002
  - button "Open calendar"
  - text: Rol
  - combobox "Rol": VENDEDOR
  - text: Contraseña
  - textbox "Contraseña": Vendedor12!
  - button "Ocultar o mostrar contraseña"
  - list:
    - listitem: Mínimo 8 caracteres
    - listitem: Una letra mayúscula
    - listitem: Una letra minúscula
    - listitem: Un número
    - listitem: Un caracter especial (!@#$%^&*)
  - text: Confirmar Contraseña
  - textbox "Confirmar Contraseña": Vendedor12!
  - button "Ocultar o mostrar contraseña"
  - text: "Error inesperado: could not execute statement [ERROR: duplicate key value violates unique constraint \"usuario_pkey\" Detail: Key (id)=(1) already exists.] [insert into usuario (activo,apellido,documento,email,email_verificado,fecha_creacion,fecha_nacimiento,nombre,contrasena,rol,tipo_documento) values (?,?,?,?,?,?,?,?,?,?,?)]; SQL [insert into usuario (activo,apellido,documento,email,email_verificado,fecha_creacion,fecha_nacimiento,nombre,contrasena,rol,tipo_documento) values (?,?,?,?,?,?,?,?,?,?,?)]; constraint [usuario_pkey]"
  - button "Cancelar"
  - button "Guardar"
```