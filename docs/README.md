# Documentación Evernear

Evernear es una plataforma **informativa** de descubrimiento regional para la Triple Frontera (Puerto Iguazú · Foz do Iguaçu · Ciudad del Este). Este directorio describe cómo está armado el producto, los flujos de usuario y cómo incorporar nuevos integrantes al equipo.

## Índice

| Documento | Contenido |
|-----------|-----------|
| [Visión y producto](./vision-producto.md) | Qué es Evernear, audiencias, verticales, límites del MVP |
| [Arquitectura](./arquitectura.md) | Stack, capas, providers, integraciones externas |
| [Flujos de usuario](./flujos-usuario.md) | Recorridos por persona, interacciones y estados |
| [Mapas de decisión por ruta](./mapas-decision-rutas.md) | Diagramas Mermaid para **cada ruta** del ecosistema |
| [Rutas y páginas](./rutas-paginas.md) | Mapa del App Router y patrones de layout |
| [Datos y APIs](./datos-apis.md) | Catálogos estáticos, store en memoria, endpoints |
| [Frontend y componentes](./frontend-componentes.md) | Carpetas `evernear` vs `ecosystem`, UI compartida |
| [Onboarding del equipo](./onboarding-equipo.md) | Setup local, scripts, convenciones, primeras tareas |
| [Diagramas](./diagramas.md) | Diagramas Mermaid de referencia (copiables) |

## Lectura recomendada

**Producto / diseño:** visión → flujos → rutas.

**Ingeniería:** onboarding → arquitectura → datos y APIs → frontend.

## Convenciones del repo

- Nombre del paquete npm: `evernear-site`.
- Producción prevista: `https://evernear.io` (ver `metadataBase` en `src/app/layout.tsx`).
- No hay base de datos ni autenticación en producción todavía; ver `.env.example`.
