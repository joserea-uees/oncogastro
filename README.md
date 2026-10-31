# ONCOGASTRO

Landing corporativa en React, TypeScript, Tailwind CSS y Lucide. Solo frontend, sin base de datos.

## Desarrollo

`npm install` y `npm run dev`. Compilación: `npm run build`.

## Contenido configurable

- `src/data/contact.ts`: WhatsApp (código de país y número), teléfono, correo, dirección, horarios y redes. Los campos vacíos no generan contactos ficticios. WhatsApp muestra un aviso hasta configurar el número.
- `src/data/doctors.ts`: especialistas, formación y fotografía oficial opcional. Sin foto se muestra una silueta explícitamente provisional.
- `src/data/services.ts`: especialidades y descripciones.
