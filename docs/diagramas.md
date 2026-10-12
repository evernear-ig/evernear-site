# Diagramas de referencia (Mermaid)

Copia estos bloques en GitHub, GitLab, Notion o cualquier visor compatible con Mermaid.

## 1. Contexto del sistema (C4 simplificado)

```mermaid
C4Context
  title CONEXA - Contexto
  Person(residente, "Residente / visitante", "Explora la región")
  Person(org, "Organización", "Quiere visibilidad y colaborar")
  System(conexa, "CONEXA Web", "Next.js - información regional")
  System_Ext(google, "Google Gemini", "Chat asistido")
  System_Ext(orgs, "Sitios de terceros", "Pagos, donaciones, reservas")

  Rel(residente, conexa, "Navega, filtra, suscribe demo")
  Rel(org, conexa, "Unirse, publicar evento demo")
  Rel(conexa, google, "POST /api/chat")
  Rel(residente, orgs, "Acciones reales fuera de CONEXA")
```

> Nota: el diagrama C4 requiere extensión Mermaid con soporte `C4Context`. Si no renderiza, usa el diagrama flowchart de `arquitectura.md`.

## 2. Componentes del cliente

```mermaid
flowchart TB
  subgraph App["Aplicación Next.js"]
    R["Router\nsrc/app"]
    S["SiteShell"]
    R --> S
    S --> H["Header / Footer"]
    S --> M["#main pages"]
    S --> J["JoinModal"]
    S --> G["ConexaGuideLayer"]
  end

  M --> V["Vertical pages"]
  M --> L["Landing"]
  G --> Chat["/api/chat"]
  V --> API["/api/*"]
```

## 3. Pipeline de una vertical tipo catálogo

```mermaid
flowchart LR
  P["page.tsx\nverticalSlug"] --> VCP["VerticalCatalogPage"]
  VCP --> VPS["VerticalPageShell"]
  VPS --> VH["VerticalHero"]
  VPS --> VG["VerticalGuideSection"]
  VPS --> VCC["VerticalCatalogContent"]
  VCC --> GVC["getVerticalCatalog()"]
  GVC --> VL["VERTICAL_LISTINGS"]
```

## 4. Estados de la mascota Conexa

```mermaid
stateDiagram-v2
  [*] --> idle
  idle --> menu: click
  menu --> tour: iniciar tour
  menu --> chat: abrir chat
  tour --> idle: finalizar / cerrar
  chat --> idle: cerrar
  idle --> idle: arrastrar dock
```

## 5. Dependencias de datos (build time vs runtime)

```mermaid
flowchart TB
  subgraph Build["Build time"]
    TS["src/data/**"]
    IMG["public/images/**"]
    I18N["translations"]
  end

  subgraph Runtime["Runtime servidor"]
    API["API routes"]
    MEM["store.ts"]
  end

  subgraph RuntimeClient["Runtime cliente"]
    LS["localStorage\nlang, mascot pos"]
  end

  TS --> Pages["RSC / imports"]
  IMG --> Pages
  I18N --> Pages
  API --> MEM
  Pages --> LS
```

## 6. Matriz vertical → listing → página

```mermaid
flowchart TB
  verticals["ECOSYSTEM_VERTICALS"] --> catalog["vertical-catalog.ts"]
  listings["VERTICAL_LISTINGS"] --> catalog
  catalog --> content["VerticalCatalogContent"]
  verticals --> app["app/&lt;slug&gt;/page.tsx"]
  app --> catalog
```

## 7. Seguridad y límites actuales

```mermaid
flowchart LR
  User["Usuario anónimo"] --> Public["Rutas públicas"]
  Public --> API["API sin auth"]
  API --> Rate["Sin rate limit en repo"]
  API --> Mem["Datos no sensibles demo"]

  style Rate fill:#fff3cd
  style Mem fill:#fff3cd
```

Al acercarse a producción real: autenticación para publicadores, rate limiting en `/api/chat`, persistencia y validación server-side reforzada.

---

## 8. Enlace a mapas por ruta

Todos los diagramas de decisión del ecosistema (home, 11 verticales, pulso, QR, legal, etc.) están en **[mapas-decision-rutas.md](./mapas-decision-rutas.md)**.

Diagramas relacionados con más detalle narrativo:

- [Arquitectura](./arquitectura.md)
- [Flujos de usuario](./flujos-usuario.md)
- [Datos y APIs](./datos-apis.md)
