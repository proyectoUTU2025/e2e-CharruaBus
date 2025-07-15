# Page snapshot

```yaml
- dialog:
  - heading "Viaje AAA-1111" [level=2]
  - paragraph: MONTEVIDEO - Terminal Tres Cruces → MALDONADO - Punta del Este
  - button
  - tablist:
    - tab "Detalles del Viaje" [selected]
    - tab "Asientos 2"
    - tab "Historial de Pasajes"
  - tabpanel "Detalles del Viaje":
    - heading "Ruta y Horarios" [level=3]
    - text: ORIGEN MONTEVIDEO - Terminal Tres Cruces DESTINO MALDONADO - Punta del Este ÓMNIBUS AAA-1111 Salida 10/10/25 - 08:00 Llegada 10/10/25 - 12:00 Duración 4h 00m
    - heading "Resumen de la ruta" [level=4]
    - list:
      - listitem: MONTEVIDEO - Terminal Tres Cruces (Origen)
      - listitem: MALDONADO - Punta del Este (Destino)
    - heading "Tarifas y Disponibilidad" [level=3]
    - text: VENTA DISPONIBLE $100 Precio del pasaje $100 Precio por tramo 0% Ocupación 40 ASIENTOS TOTALES 40 DISPONIBLES 0 RESERVADOS 0 VENDIDOS
    - button "Reasignar Ómnibus"
- dialog:
  - heading "Reasignar Ómnibus" [level=2]
  - paragraph: "Seleccione un nuevo ómnibus para el viaje:"
  - heading "No hay ómnibus disponibles" [level=4]
  - paragraph: No se encontraron ómnibus disponibles para las fechas y características de este viaje.
  - button "Cancelar"
  - button "Confirmar" [disabled]
```