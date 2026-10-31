# ONCOGASTRO

Landing corporativa en React, TypeScript, Tailwind CSS y Lucide. Solo frontend, sin base de datos.

## Desarrollo

`npm install` y `npm run dev`. Compilación: `npm run build`.

## Contenido configurable

- `src/data/contact.ts`: WhatsApp (código de país y número), teléfono, correo, dirección, horarios y redes. Los campos vacíos no generan contactos ficticios. WhatsApp muestra un aviso hasta configurar el número.
- `src/data/doctors.ts`: especialistas, formación y fotografía oficial opcional. Sin foto se muestra una silueta explícitamente provisional.
- `src/data/services.ts`: especialidades y descripciones.

Las imágenes de Unsplash son ilustrativas y están alojadas en `public/images`. No representan personal ni instalaciones de ONCOGASTRO. Sustituirlas por fotografías institucionales cuando estén disponibles. La fuente se sirve desde Google Fonts con fuentes de sistema como alternativa.

Antes de apertura al público, completar datos oficiales y el aviso institucional de privacidad. La página no recibe ni almacena solicitudes de citas; el contacto usa enlaces externos al configurarlos.
