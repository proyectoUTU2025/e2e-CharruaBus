# Page snapshot

```yaml
- dialog:
  - heading "Crear Nuevo Usuario" [level=2]
  - text: Nombre
  - textbox "Nombre"
  - text: Apellido
  - textbox "Apellido": ApellidoTest
  - text: Correo
  - textbox "Correo": sin-arroba.com
  - text: El formato del correo no es válido. Tipo de Documento
  - combobox "Tipo de Documento"
  - text: Documento
  - textbox "Documento"
  - text: Fecha de Nacimiento
  - textbox "Fecha de Nacimiento"
  - button "Open calendar"
  - text: Rol
  - combobox "Rol"
  - text: Contraseña
  - textbox "Contraseña"
  - button "Ocultar o mostrar contraseña"
  - text: Confirmar Contraseña
  - textbox "Confirmar Contraseña"
  - button "Ocultar o mostrar contraseña"
  - button "Cancelar"
  - button "Guardar" [disabled]
```