# Flujos de usuario

Este documento describe recorridos típicos y cómo se conectan con rutas, componentes y APIs.

## Flujo 1: Descubrimiento desde la home

```mermaid
sequenceDiagram
  actor U as Usuario
  participant H as Home /
  participant E as EcosystemSection
  participant V as Vertical /deporte
  participant C as VerticalCatalogContent

  U->>H: Entra al sitio
  U->>H: Scroll o navegación
  H->>E: Muestra grid de verticales
  U->>V: Clic en vertical
  V->>C: Hero + guía + catálogo
  U->>C: Filtros ciudad / categoría
  C-->>U: Tarjetas EntityCard
```

**Puntos clave**

- La home no carga datos remotos; es composición de secciones estáticas.
- Cada vertical usa listings de `VERTICAL_LISTINGS` (`src/data/listings/index.ts`).

## Flujo 2: Explorar el ecosistema completo

```mermaid
flowchart LR
  A["/ecosistema"] --> B["Familia Comunidad"]
  A --> C["Familia Región"]
  B --> D["/deporte, /salud, ..."]
  C --> E["/turismo, /comercios, ..."]
```

`EcosystemIndexPage` reutiliza `COMMUNITY_VERTICALS` y `REGION_VERTICALS` de `verticals.ts`.

## Flujo 3: Unirse a CONEXA (organización o persona)

```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> ModalOpen: CTA Header / Founding / JoinButton
  ModalOpen --> WizardSteps: openJoin(prefill?)
  WizardSteps --> Validating: Enviar
  Validating --> WizardSteps: Error validación
  Validating --> Success: OK
  Success --> Idle: Cerrar
  note right of Success
    Prototipo: console.log
    No persiste en servidor
  end note
```

**Entradas al modal**

- Botón “Unirse” en header (`JoinButton`).
- Sección founding en home.
- Prefill por vertical vía `joinTrack` en `vertical-catalog` (deporte, salud, solidaridad, innovación).

**Implementación**: `JoinModal.tsx` + `JoinModalProvider.tsx`.

## Flujo 4: Tour y chat con Conexa (mascota)

```mermaid
flowchart TB
  Dock["Mascota acoplada\nConexaGuideLayer"]
  Dock --> Menu["Menú idle"]
  Menu --> Tour["Modo tour\nOnboardJS steps"]
  Menu --> Chat["Modo chat\nConexaChatPanel"]
  Tour --> Spotlight["ConexaSpotlight\nanclas #hero, #border..."]
  Chat --> API["POST /api/chat"]
  API --> Model["Gemini vía AI SDK"]
```

- Pasos del tour: `buildConexaJourneySteps` + `getConexaSections(pathname)`.
- Posición de la mascota: `localStorage` (`conexa-mascot-pos-v1`).
- El chat envía `pathname` y `lang` para contextualizar respuestas (`conexa-prompt.ts`).

## Flujo 5: Eventos (listado + publicar + detalle)

```mermaid
sequenceDiagram
  actor U as Usuario
  participant EP as /eventos
  participant API as /api/events
  participant Store as store.ts
  participant Det as /eventos/[slug]

  EP->>API: GET (client)
  API->>Store: getEvents()
  Store-->>EP: JSON eventos
  U->>EP: Publicar evento
  EP->>API: POST body
  API->>Store: addEvent + qrToken
  U->>Det: Abrir detalle
  Det-->>U: EventQrBlock / info
```

Seed inicial: `SEED_EVENTS` en `src/data/events.ts`.

## Flujo 6: Comercios, QR y panfleto

```mermaid
flowchart TB
  subgraph Comercios
    L["/comercios"] --> D["/comercios/[slug]"]
    D --> Scan["GET/POST /api/qr/scan"]
    P["/comercios/panfleto"] --> PS["/api/panfleto/subscribe"]
    P --> PE["/api/panfleto/entry"]
  end
  subgraph QR público
    Q["/qr/escanear"] --> Scan
  end
  Scan --> Store["recordQrScan"]
```

Los comercios demo incluyen `qrId`; el contador de escaneos es volátil.

## Flujo 7: Historias de la comunidad

1. Usuario en `/que-es#historias` ( `/historias` redirige con `RedirectToCommunityHash`).
2. Formulario `StorySubmitForm` → `POST /api/historias/submit` → `submitStory()` en store.
3. Contenido curado estático en `src/data/stories.ts` y componentes `stories/*`.

## Flujo 8: Pulso semanal

```mermaid
flowchart LR
  P["/pulso"] --> Preview["GET /api/pulso/preview"]
  P --> Sub["POST /api/pulso/subscribe"]
  Preview --> Data["pulso-items.ts\npulso-editions.ts\n+ store opcional"]
  Sub --> Store["pulsoSubscribers"]
```

UI modular en `src/components/ecosystem/pulso/*` y estilos `src/styles/pulso.css`.

## Flujo 9: Cambio de idioma

```mermaid
sequenceDiagram
  participant LS as LangSwitch
  participant I18n as I18nProvider
  participant T as Componente T

  LS->>I18n: setLang(es|pt|en)
  I18n->>I18n: localStorage trinexus.lang.v1
  I18n->>T: translate(key)
  T-->>LS: Texto actualizado
```

Traducciones: `src/lib/i18n/translations.ts` (generado/acompañado por `scripts/build-translations.mjs`).

## Mapa de decisión rápido (usuario nuevo)

```mermaid
flowchart TD
  Start((Llega a CONEXA)) --> Q1{¿Busca info regional?}
  Q1 -->|Sí| Eco["/ecosistema o vertical"]
  Q1 -->|No| Q2{¿Quiere participar?}
  Q2 -->|Sí| Join["Modal Unirse"]
  Q2 -->|No| Q3{¿Necesita guía?}
  Q3 -->|Sí| Mascot["Tour o Chat Conexa"]
  Q3 -->|No| Pulso["/pulso o /que-es"]
```
