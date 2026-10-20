const CITIES = "Puerto Iguazú, Foz do Iguaçu y Ciudad del Este";
const CITIES_PT = "Puerto Iguazú, Foz do Iguaçu e Ciudad del Este";
const CITIES_EN = "Puerto Iguazú, Foz do Iguaçu and Ciudad del Este";

const SHELL = {
  es: {
    pathAria: "Cómo funciona esta sección",
    audienceH: "Para quién es",
    regionH: "Tres ciudades, un mismo ecosistema",
    s1: "Descubrí",
    s2: "Filtrá",
    s3: "Contactá",
    s4: "Sumate",
    contactP: (who) => `Cada ficha lleva al ${who}. Evernear conecta; no intermedia.`,
    joinP: (who) =>
      `Si ${who}, dejá tus datos y te avisamos cuando abramos tu ficha.`,
    empty: (dim) =>
      `No hay fichas con esa combinación de ciudad y ${dim}. Probá ampliar alguno de los filtros.`,
    filterNote: (ctx) =>
      `Fichas ilustrativas ${ctx}. El contacto siempre es directo.`,
    regionP: (detail) =>
      `Empezamos en la Triple Frontera. Cada ficha indica ${detail}.`,
  },
  pt: {
    pathAria: "Como funciona esta seção",
    audienceH: "Para quem é",
    regionH: "Três cidades, um mesmo ecossistema",
    s1: "Descubra",
    s2: "Filtre",
    s3: "Contate",
    s4: "Junte-se",
    contactP: (who) => `Cada ficha leva ao ${who}. A Evernear conecta; não intermedia.`,
    joinP: (who) =>
      `Se ${who}, deixe seus dados e avisamos quando abrirmos sua ficha.`,
    empty: (dim) =>
      `Não há fichas com essa combinação de cidade e ${dim}. Tente ampliar algum filtro.`,
    filterNote: (ctx) =>
      `Fichas ilustrativas ${ctx}. O contato é sempre direto.`,
    regionP: (detail) =>
      `Começamos na Tríplice Fronteira. Cada ficha indica ${detail}.`,
  },
  en: {
    pathAria: "How this section works",
    audienceH: "Who it is for",
    regionH: "Three cities, one ecosystem",
    s1: "Discover",
    s2: "Filter",
    s3: "Contact",
    s4: "Join",
    contactP: (who) =>
      `Each listing links to the ${who}. Evernear connects; it does not intermediate.`,
    joinP: (who) =>
      `If ${who}, leave your details and we will notify you when your listing goes live.`,
    empty: (dim) =>
      `No listings match that city and ${dim} combination. Try broadening a filter.`,
    filterNote: (ctx) =>
      `Illustrative listings ${ctx}. Contact is always direct.`,
    regionP: (detail) =>
      `We start at the Triple Border. Each listing shows ${detail}.`,
  },
  gn: {
    pathAria: "Mba'éichapa oiko ko tenda",
    audienceH: "Máva-pe g̃uarã",
    regionH: "Mbohapy táva, peteĩ tekoha",
    s1: "Ehecha",
    s2: "Efiltro",
    s3: "Eñe'ẽ",
    s4: "Eike",
    contactP: (who) => `Ficha peteĩha ogueraha ${who}-pe. Evernear ojoaju, ndointermedia.`,
    joinP: (who) => `Reguerekóramo ${who}, emoherakuã ne marandu ha roikuaau ficha ojuruja jave.`,
    empty: (dim) =>
      `Ndaipóri ficha ko filtro ${dim} ndive. Eipru ampliar peteĩ filtro.`,
    filterNote: (ctx) => `Ficha ohechauka ${ctx}. Contacto oiko tapo omoherakuã ndive.`,
    regionP: (detail) => `Rojepyru Triple Frontera-pe. Ficha peteĩha ohechauka ${detail}.`,
  },
};

/** @type {Record<string, Record<"es"|"pt"|"en"|"gn", Record<string, string>>>} */
export const LOCALIZED_GUIDES = {
  sport: {
    es: {
      disclaimer:
        "Evernear no organiza torneos ni gestiona inscripciones. Siempre contactás a quien publica la información.",
      s1p: `Clubes, talentos y convocatorias de ${CITIES}.`,
      s2p: "Por ciudad y disciplina para encontrar lo que te interesa en segundos.",
      a1s: "Visibilidad, captación y conexión con la comunidad y auspiciantes.",
      a2s: "Pruebas, equipos, visibilidad regional y oportunidades cross-border.",
      a3: "Convocatorias",
      a3s: "Torneos, pruebas abiertas y búsqueda de equipo — siempre con contacto directo.",
      a4s: "Causas y clubes alineados con tu marca en la Triple Frontera.",
      q: "<b>El talento está en todas partes.</b> Evernear lo acerca a quien busca y a quien puede apoyar.",
      cta: "Sumá tu club o proyecto",
      comingP:
        "Directorio de ejemplo con clubes, talentos y convocatorias reales de la Triple Frontera. Filtrá por ciudad y modalidad para encontrar lo que te interesa.",
      filterCtx: "basadas en la escena deportiva regional",
      comingNote:
        "Los contactos y enlaces van al organizador. Evernear solo publica información para que la descubras.",
      contactWho: "organizador",
      joinWho: "tenés un club o proyecto",
      regionDetail: "en qué ciudad ocurre o desde dónde se organiza",
      emptyDim: "modalidad",
    },
    pt: {
      disclaimer:
        "A Evernear não organiza torneios nem gerencia inscrições. Você sempre fala com quem publica a informação.",
      s1p: `Clubes, talentos e convocatórias de ${CITIES_PT}.`,
      s2p: "Por cidade e modalidade para achar o que importa em segundos.",
      a1s: "Visibilidade, captação e conexão com a comunidade e patrocinadores.",
      a2s: "Peneiras, equipes, visibilidade regional e oportunidades cross-border.",
      a3: "Convocatórias",
      a3s: "Torneios, peneiras abertas e busca de equipe — sempre com contato direto.",
      a4s: "Causas e clubes alinhados à sua marca na Tríplice Fronteira.",
      q: "<b>O talento está em todo lugar.</b> A Evernear aproxima quem busca e quem pode apoiar.",
      cta: "Some seu clube ou projeto",
      comingP:
        "Diretório de exemplo com clubes, talentos e convocatórias da Tríplice Fronteira. Filtre por cidade e modalidade.",
      filterCtx: "baseadas na cena esportiva regional",
      comingNote:
        "Contatos e links vão ao organizador. A Evernear só publica informação para você descobrir.",
      contactWho: "organizador",
      joinWho: "você tem um clube ou projeto",
      regionDetail: "em qual cidade acontece ou de onde é organizada",
      emptyDim: "modalidade",
    },
    en: {
      disclaimer:
        "Evernear does not run tournaments or manage registrations. You always contact whoever published the information.",
      s1p: `Clubs, talent and calls from ${CITIES_EN}.`,
      s2p: "By city and discipline to find what matters in seconds.",
      a1s: "Visibility, recruitment and connection with community and sponsors.",
      a2s: "Trials, teams, regional visibility and cross-border opportunities.",
      a3: "Open calls",
      a3s: "Tournaments, open trials and team searches — always with direct contact.",
      a4s: "Causes and clubs aligned with your brand across the Triple Border.",
      q: "<b>Talent is everywhere.</b> Evernear brings together those who search and those who can support.",
      cta: "Add your club or project",
      comingP:
        "Sample directory with clubs, talent and calls from the Triple Border. Filter by city and discipline.",
      filterCtx: "based on the regional sports scene",
      comingNote:
        "Contacts and links go to the organizer. Evernear only publishes information for discovery.",
      contactWho: "organizer",
      joinWho: "you run a club or project",
      regionDetail: "which city it belongs to or where it is organized from",
      emptyDim: "discipline",
    },
    gn: {
      disclaimer: "Evernear ndoorganiza torneo. Eñe'ẽ tapo omoherakuãva marandu.",
      s1p: `Club, katupyry ha convocatoria ${CITIES}-gui.`,
      s2p: "Táva ha disciplina rupi ehecha mba'épa reipotáva.",
      a1s: "Jehecha, captación ha ñembojoaju comunidad ndive.",
      a2s: "Prueba, equipo, jehecha regional ha oportunidad cross-border.",
      a3: "Convocatoria",
      a3s: "Torneo, prueba ijurujáva ha equipo jeheka — contacto directo.",
      a4s: "Causa ha club ojoaju ne réra Triple Frontera-pe.",
      q: "<b>Katupyry oĩ opápe.</b> Evernear omyendy oheka ha oipytyvõva.",
      cta: "Emoĩ ne club térã tembiapo",
      comingP:
        "Directorio ejemplo club, katupyry ha convocatoria Triple Frontera-gui. Efiltro táva ha modalidad rupi.",
      filterCtx: "escena deportiva regiónpe",
      comingNote: "Contacto ha enlace ogueraha organizador-pe. Evernear marandu añoite.",
      contactWho: "organizador",
      joinWho: "club térã tembiapo",
      regionDetail: "mba'épa táva",
      emptyDim: "modalidad",
    },
  },
  health: {
    es: {
      disclaimer:
        "Evernear no presta servicios de salud ni agenda turnos. Siempre contactás al profesional o institución que publica.",
      s1p: `Hospitales, clínicas y profesionales de ${CITIES}.`,
      s2p: "Por ciudad y especialidad para encontrar referencias en segundos.",
      a1s: "Visibilidad regional, referencia comunitaria y conexión informativa.",
      a2s: "Opciones claras para quien busca atención o información de salud en la región.",
      a3: "Prevención y redes",
      a3s: "Campañas, asociaciones y recursos de salud pública — siempre con contacto directo.",
      a4s: "ONG y proyectos de salud comunitaria alineados con tu causa.",
      q: "<b>La salud cruzada necesita mapas claros.</b> Evernear acerca información y contacto directo.",
      cta: "Sumá tu institución o práctica",
      comingP:
        "Directorio informativo de instituciones y profesionales de salud en la Triple Frontera. Filtrá por ciudad y especialidad.",
      filterCtx: "con datos de referencia",
      comingNote:
        "Evernear no presta servicios de salud. Los contactos van al profesional o institución.",
      contactWho: "prestador",
      joinWho: "sos institución o profesional",
      regionDetail: "ciudad y tipo de prestador",
      emptyDim: "especialidad",
    },
    pt: {
      disclaimer:
        "A Evernear não presta serviços de saúde nem agenda consultas. Você sempre fala com quem publica.",
      s1p: `Hospitais, clínicas e profissionais de ${CITIES_PT}.`,
      s2p: "Por cidade e especialidade para achar referências em segundos.",
      a1s: "Visibilidade regional, referência comunitária e conexão informativa.",
      a2s: "Opções claras para quem busca atendimento ou informação de saúde na região.",
      a3: "Prevenção e redes",
      a3s: "Campanhas, associações e recursos de saúde pública — sempre com contato direto.",
      a4s: "ONGs e projetos de saúde comunitária alinhados à sua causa.",
      q: "<b>A saúde cross-border precisa de mapas claros.</b> A Evernear aproxima informação e contato direto.",
      cta: "Some sua instituição ou prática",
      comingP:
        "Diretório informativo de instituições e profissionais de saúde na Tríplice Fronteira. Filtre por cidade e especialidade.",
      filterCtx: "com dados de referência",
      comingNote:
        "A Evernear não presta serviços de saúde. Os contatos vão ao profissional ou instituição.",
      contactWho: "prestador",
      joinWho: "você é instituição ou profissional",
      regionDetail: "cidade e tipo de prestador",
      emptyDim: "especialidade",
    },
    en: {
      disclaimer:
        "Evernear does not provide health services or schedule appointments. You always contact whoever published the listing.",
      s1p: `Hospitals, clinics and professionals from ${CITIES_EN}.`,
      s2p: "By city and specialty to find references in seconds.",
      a1s: "Regional visibility, community reference and informative connection.",
      a2s: "Clear options for anyone seeking care or health information in the region.",
      a3: "Prevention and networks",
      a3s: "Campaigns, associations and public health resources — always with direct contact.",
      a4s: "NGOs and community health projects aligned with your cause.",
      q: "<b>Cross-border health needs clear maps.</b> Evernear brings information and direct contact together.",
      cta: "Add your institution or practice",
      comingP:
        "Informative directory of health institutions and professionals across the Triple Border. Filter by city and specialty.",
      filterCtx: "with reference data",
      comingNote:
        "Evernear does not provide health services. Contacts go to the professional or institution.",
      contactWho: "provider",
      joinWho: "you are an institution or professional",
      regionDetail: "city and provider type",
      emptyDim: "specialty",
    },
    gn: {
      disclaimer: "Evernear ndome'ẽ tembikuaa. Eñe'ẽ tapo omoherakuãva marandu.",
      s1p: `Hospital, clínica ha tembikuaa ${CITIES}-gui.`,
      s2p: "Táva ha especialidad rupi ehecha referencia.",
      a1s: "Jehecha regional ha ñembojoaju comunidad ndive.",
      a2s: "Opción ohechaukáva oheka tembikuaa regiónpe.",
      a3: "Prevención ha red",
      a3s: "Campaña ha recurso salud pública — contacto directo.",
      a4s: "ONG ha tembiapo salud comunitaria.",
      q: "<b>Tembikuaa oikova'erã mapa hekopáva.</b> Evernear omyendy marandu ha contacto.",
      cta: "Emoĩ ne institución térã práctica",
      comingP: "Directorio tembikuaa Triple Frontera-pe. Efiltro táva ha especialidad rupi.",
      filterCtx: "marandu referencia rehe",
      comingNote: "Evernear ndome'ẽ tembikuaa. Contacto ogueraha profesional-pe.",
      contactWho: "prestador",
      joinWho: "institución térã profesional",
      regionDetail: "táva ha tipo prestador",
      emptyDim: "especialidad",
    },
  },
  wellness: mk("wellness", {
    es: {
      disclaimer:
        "Evernear no ofrece consultas ni terapias. La información es orientativa; el contacto es directo con quien publica.",
      s1p: `Espacios de bienestar, psicología y recursos de las tres ciudades de la Triple Frontera.`,
      s2p: "Por ciudad y enfoque para encontrar lo que buscás en segundos.",
      a1s: "Visibilidad, captación y conexión con la comunidad regional.",
      a2s: "Recursos accesibles para quien busca acompañamiento o bienestar en la región.",
      a3: "Grupos y talleres",
      a3s: "Encuentros, círculos y propuestas grupales — siempre con contacto directo.",
      a4s: "Estudios y espacios alineados con tu propuesta de cuidado integral.",
      q: "<b>El bienestar también cruza fronteras.</b> Evernear acerca espacios y contacto directo.",
      cta: "Sumá tu espacio o práctica",
      comingP:
        "Directorio de espacios y recursos de bienestar en la Triple Frontera. Filtrá por ciudad y enfoque.",
      filterCtx: "con información de referencia",
      comingNote:
        "Evernear no ofrece consultas en la plataforma. Los contactos van a quien publica.",
      contactWho: "espacio o profesional",
      joinWho: "tenés un espacio o práctica de bienestar",
      regionDetail: "en qué ciudad ocurre o desde dónde se ofrece",
      emptyDim: "enfoque",
    },
    pt: {
      disclaimer:
        "A Evernear não oferece consultas nem terapias. A informação é orientativa; o contato é direto com quem publica.",
      s1p: `Espaços de bem-estar, psicologia e recursos das três cidades da Tríplice Fronteira.`,
      s2p: "Por cidade e enfoque para achar o que você busca em segundos.",
      a1s: "Visibilidade, captação e conexão com a comunidade regional.",
      a2s: "Recursos acessíveis para quem busca acompanhamento ou bem-estar na região.",
      a3: "Grupos e oficinas",
      a3s: "Encontros, círculos e propostas em grupo — sempre com contato direto.",
      a4s: "Estúdios e espaços alinhados à sua proposta de cuidado integral.",
      q: "<b>O bem-estar também cruza fronteiras.</b> A Evernear aproxima espaços e contato direto.",
      cta: "Some seu espaço ou prática",
      comingP:
        "Diretório de espaços e recursos de bem-estar na Tríplice Fronteira. Filtre por cidade e enfoque.",
      filterCtx: "com informação de referência",
      comingNote:
        "A Evernear não oferece consultas na plataforma. Os contatos vão a quem publica.",
      contactWho: "espaço ou profissional",
      joinWho: "você tem um espaço ou prática de bem-estar",
      regionDetail: "em qual cidade acontece ou de onde é oferecida",
      emptyDim: "enfoque",
    },
    en: {
      disclaimer:
        "Evernear does not offer consultations or therapy. Information is for reference; contact is direct with whoever published it.",
      s1p: `Wellness spaces, psychology and resources from the three Triple Border cities.`,
      s2p: "By city and focus to find what you need in seconds.",
      a1s: "Visibility, outreach and connection with the regional community.",
      a2s: "Accessible resources for anyone seeking support or wellness in the region.",
      a3: "Groups and workshops",
      a3s: "Meetups, circles and group offerings — always with direct contact.",
      a4s: "Studios and spaces aligned with your holistic care approach.",
      q: "<b>Wellness crosses borders too.</b> Evernear brings spaces and direct contact together.",
      cta: "Add your space or practice",
      comingP:
        "Directory of wellness spaces and resources across the Triple Border. Filter by city and focus.",
      filterCtx: "with reference information",
      comingNote:
        "Evernear does not offer consultations on the platform. Contacts go to whoever published.",
      contactWho: "space or professional",
      joinWho: "you run a wellness space or practice",
      regionDetail: "which city it serves or where it is offered from",
      emptyDim: "focus",
    },
  }),
  communication: mk("communication", {
    es: {
      disclaimer:
        "Evernear no produce contenido ni gestiona suscripciones. Siempre contactás a quien publica la información.",
      s1p: `Medios, canales y voces de ${CITIES}.`,
      s2p: "Por ciudad y formato para encontrar quién cuenta la región en segundos.",
      a1s: "Visibilidad, audiencia y conexión con la comunidad trifronteriza.",
      a2s: "Voces independientes que buscan espacio y referencia regional.",
      a3: "Newsletters y canales",
      a3s: "Boletines, podcasts y formatos digitales — siempre con contacto directo.",
      a4s: "Marcas y proyectos que quieren alinearse con voces locales.",
      q: "<b>La región tiene muchas voces.</b> Evernear las acerca a quien busca y a quien puede apoyar.",
      cta: "Sumá tu medio o proyecto",
      comingP:
        "Directorio de medios y voces regionales en la Triple Frontera. Filtrá por ciudad y formato.",
      filterCtx: "basadas en la escena comunicacional regional",
      comingNote:
        "Los contactos y enlaces van al medio o creador. Evernear solo publica información.",
      contactWho: "medio o creador",
      joinWho: "tenés un medio o proyecto de comunicación",
      regionDetail: "desde qué ciudad comunica o cubre",
      emptyDim: "formato",
    },
    pt: {
      disclaimer:
        "A Evernear não produz conteúdo nem gerencia assinaturas. Você sempre fala com quem publica a informação.",
      s1p: `Mídias, canais e vozes de ${CITIES_PT}.`,
      s2p: "Por cidade e formato para achar quem conta a região em segundos.",
      a1s: "Visibilidade, audiência e conexão com a comunidade trifronteiriça.",
      a2s: "Vozes independentes que buscam espaço e referência regional.",
      a3: "Newsletters e canais",
      a3s: "Boletins, podcasts e formatos digitais — sempre com contato direto.",
      a4s: "Marcas e projetos que querem se alinhar a vozes locais.",
      q: "<b>A região tem muitas vozes.</b> A Evernear aproxima quem busca e quem pode apoiar.",
      cta: "Some sua mídia ou projeto",
      comingP:
        "Diretório de mídias e vozes regionais na Tríplice Fronteira. Filtre por cidade e formato.",
      filterCtx: "baseadas na cena comunicacional regional",
      comingNote:
        "Contatos e links vão à mídia ou criador. A Evernear só publica informação.",
      contactWho: "mídia ou criador",
      joinWho: "você tem uma mídia ou projeto de comunicação",
      regionDetail: "de qual cidade comunica ou cobre",
      emptyDim: "formato",
    },
    en: {
      disclaimer:
        "Evernear does not produce content or manage subscriptions. You always contact whoever published the information.",
      s1p: `Media, channels and voices from ${CITIES_EN}.`,
      s2p: "By city and format to find who tells the region's story in seconds.",
      a1s: "Visibility, audience and connection with the tri-border community.",
      a2s: "Independent voices seeking space and regional reference.",
      a3: "Newsletters and channels",
      a3s: "Newsletters, podcasts and digital formats — always with direct contact.",
      a4s: "Brands and projects that want to align with local voices.",
      q: "<b>The region has many voices.</b> Evernear brings together those who search and those who can support.",
      cta: "Add your media or project",
      comingP:
        "Directory of regional media and voices across the Triple Border. Filter by city and format.",
      filterCtx: "based on the regional communication scene",
      comingNote:
        "Contacts and links go to the media outlet or creator. Evernear only publishes information.",
      contactWho: "outlet or creator",
      joinWho: "you run a media outlet or communication project",
      regionDetail: "which city it communicates from or covers",
      emptyDim: "format",
    },
  }),
  solidarity: mk("solidarity", {
    es: {
      disclaimer:
        "Evernear no procesa donaciones ni vende rifas. Siempre contactás al organizador de cada causa.",
      s1p: `Causas, fundaciones y proyectos solidarios de ${CITIES}.`,
      s2p: "Por ciudad y tipo de causa para encontrar lo que te interesa en segundos.",
      a1s: "Visibilidad, captación y conexión con donantes y auspiciantes.",
      a2s: "Voluntarios que buscan causas concretas en la Triple Frontera.",
      a3: "Rifas informativas",
      a3s: "Sorteos y campañas publicadas para descubrir — la acción ocurre con el organizador.",
      a4s: "Marcas y aliados que buscan causas alineadas con su compromiso regional.",
      q: "<b>La solidaridad también cruza fronteras.</b> Evernear acerca causas y contacto directo.",
      cta: "Sumá tu causa o proyecto",
      comingP:
        "Directorio de causas y proyectos solidarios en la Triple Frontera. Filtrá por ciudad y tipo.",
      filterCtx: "con información de referencia",
      comingNote:
        "Evernear no procesa donaciones. Los contactos van al organizador de cada causa.",
      contactWho: "organizador",
      joinWho: "tenés una causa o proyecto",
      regionDetail: "en qué ciudad actúa o desde dónde se organiza",
      emptyDim: "tipo",
    },
    pt: {
      disclaimer:
        "A Evernear não processa doações nem vende rifas. Você sempre fala com o organizador de cada causa.",
      s1p: `Causas, fundações e projetos solidários de ${CITIES_PT}.`,
      s2p: "Por cidade e tipo de causa para achar o que importa em segundos.",
      a1s: "Visibilidade, captação e conexão com doadores e patrocinadores.",
      a2s: "Voluntários que buscam causas concretas na Tríplice Fronteira.",
      a3: "Rifas informativas",
      a3s: "Sorteios e campanhas publicadas para descobrir — a ação acontece com o organizador.",
      a4s: "Marcas e aliados que buscam causas alinhadas ao seu compromisso regional.",
      q: "<b>A solidariedade também cruza fronteiras.</b> A Evernear aproxima causas e contato direto.",
      cta: "Some sua causa ou projeto",
      comingP:
        "Diretório de causas e projetos solidários na Tríplice Fronteira. Filtre por cidade e tipo.",
      filterCtx: "com informação de referência",
      comingNote:
        "A Evernear não processa doações. Os contatos vão ao organizador de cada causa.",
      contactWho: "organizador",
      joinWho: "você tem uma causa ou projeto",
      regionDetail: "em qual cidade atua ou de onde é organizada",
      emptyDim: "tipo",
    },
    en: {
      disclaimer:
        "Evernear does not process donations or sell raffle tickets. You always contact each cause's organizer.",
      s1p: `Causes, foundations and solidarity projects from ${CITIES_EN}.`,
      s2p: "By city and cause type to find what matters in seconds.",
      a1s: "Visibility, fundraising and connection with donors and sponsors.",
      a2s: "Volunteers looking for concrete causes across the Triple Border.",
      a3: "Informational raffles",
      a3s: "Published draws and campaigns to discover — action happens with the organizer.",
      a4s: "Brands and partners seeking causes aligned with their regional commitment.",
      q: "<b>Solidarity crosses borders too.</b> Evernear brings causes and direct contact together.",
      cta: "Add your cause or project",
      comingP:
        "Directory of causes and solidarity projects across the Triple Border. Filter by city and type.",
      filterCtx: "with reference information",
      comingNote:
        "Evernear does not process donations. Contacts go to each cause's organizer.",
      contactWho: "organizer",
      joinWho: "you run a cause or project",
      regionDetail: "which city it serves or where it is organized from",
      emptyDim: "type",
    },
  }),
  tourism: mk("tourism", {
    es: {
      disclaimer:
        "Evernear no vende paquetes ni reserva alojamiento. Siempre contactás al operador o fuente que publica.",
      s1p: `Experiencias, atractivos y servicios turísticos de ${CITIES}.`,
      s2p: "Por ciudad y categoría para planificar tu visita en segundos.",
      a1s: "Visibilidad, reservas y conexión con viajeros de la región.",
      a2s: "Atractivos y rutas más allá del circuito principal de Cataratas.",
      a3: "Info práctica",
      a3s: "Datos útiles para moverte entre las tres ciudades — siempre con fuentes verificables.",
      a4s: "Operadores que buscan visibilidad trifronteriza y alianzas locales.",
      q: "<b>La región es más que las Cataratas.</b> Evernear acerca experiencias y contacto directo.",
      cta: "Sumá tu experiencia o servicio",
      comingP:
        "Directorio turístico trifronterizo con experiencias y atractivos. Filtrá por ciudad y categoría.",
      filterCtx: "con fuentes oficiales cuando están confirmadas",
      comingNote:
        "Evernear no vende ni reserva. Los contactos van al operador o fuente que publica.",
      contactWho: "operador o fuente oficial",
      joinWho: "ofrecés experiencias o servicios turísticos",
      regionDetail: "ciudad y tipo de experiencia",
      emptyDim: "categoría",
    },
    pt: {
      disclaimer:
        "A Evernear não vende pacotes nem reserva hospedagem. Você sempre fala com o operador ou fonte que publica.",
      s1p: `Experiências, atrações e serviços turísticos de ${CITIES_PT}.`,
      s2p: "Por cidade e categoria para planejar sua visita em segundos.",
      a1s: "Visibilidade, reservas e conexão com viajantes da região.",
      a2s: "Atrações e rotas além do circuito principal das Cataratas.",
      a3: "Info prática",
      a3s: "Dados úteis para se mover entre as três cidades — sempre com fontes verificáveis.",
      a4s: "Operadores que buscam visibilidade trifronteiriça e parcerias locais.",
      q: "<b>A região é mais do que as Cataratas.</b> A Evernear aproxima experiências e contato direto.",
      cta: "Some sua experiência ou serviço",
      comingP:
        "Diretório turístico trifronteiriço com experiências e atrações. Filtre por cidade e categoria.",
      filterCtx: "com fontes oficiais quando confirmadas",
      comingNote:
        "A Evernear não vende nem reserva. Os contatos vão ao operador ou fonte que publica.",
      contactWho: "operador ou fonte oficial",
      joinWho: "você oferece experiências ou serviços turísticos",
      regionDetail: "cidade e tipo de experiência",
      emptyDim: "categoria",
    },
    en: {
      disclaimer:
        "Evernear does not sell packages or book accommodation. You always contact the operator or source that published.",
      s1p: `Experiences, attractions and tourism services from ${CITIES_EN}.`,
      s2p: "By city and category to plan your visit in seconds.",
      a1s: "Visibility, bookings and connection with travelers in the region.",
      a2s: "Attractions and routes beyond the main Falls circuit.",
      a3: "Practical info",
      a3s: "Useful data to move between the three cities — always with verifiable sources.",
      a4s: "Operators seeking tri-border visibility and local partnerships.",
      q: "<b>The region is more than the Falls.</b> Evernear brings experiences and direct contact together.",
      cta: "Add your experience or service",
      comingP:
        "Tri-border tourism directory with experiences and attractions. Filter by city and category.",
      filterCtx: "with official sources when confirmed",
      comingNote:
        "Evernear does not sell or book. Contacts go to the operator or source that published.",
      contactWho: "operator or official source",
      joinWho: "you offer experiences or tourism services",
      regionDetail: "city and experience type",
      emptyDim: "category",
    },
  }),
  commerce: mk("commerce", {
    es: {
      disclaimer:
        "Evernear no procesa pagos ni gestiona pedidos. Siempre contactás al comercio que publica.",
      s1p: `Comercios locales y promos activas de ${CITIES}.`,
      s2p: "Por ciudad y rubro para encontrar ofertas y locales en segundos.",
      a1s: "Visibilidad, clientes y promos gestionadas por el propio comercio.",
      a2s: "Ofertas reales con contexto local, más actualizadas que un mapa genérico.",
      a3: "Panfleto semanal",
      a3s: "Promos destacadas de la semana — siempre con contacto directo con el local.",
      a4s: "Marcas que buscan alianzas con comercios de la Triple Frontera.",
      q: "<b>El comercio local merece visibilidad.</b> Evernear acerca locales, promos y contacto directo.",
      cta: "Sumá tu comercio",
      comingP:
        "Directorio de comercios locales con promos activas en la Triple Frontera. Filtrá por ciudad y rubro.",
      filterCtx: "gestionadas por referencia local",
      comingNote:
        "Evernear no procesa pagos. Los contactos y promos van al comercio que publica.",
      contactWho: "comercio",
      joinWho: "tenés un comercio local",
      regionDetail: "ciudad, rubro y promos activas",
      emptyDim: "rubro",
    },
    pt: {
      disclaimer:
        "A Evernear não processa pagamentos nem gerencia pedidos. Você sempre fala com o comércio que publica.",
      s1p: `Comércios locais e promos ativas de ${CITIES_PT}.`,
      s2p: "Por cidade e segmento para achar ofertas e lojas em segundos.",
      a1s: "Visibilidade, clientes e promos gerenciadas pelo próprio comércio.",
      a2s: "Ofertas reais com contexto local, mais atualizadas que um mapa genérico.",
      a3: "Panfleto semanal",
      a3s: "Promos destacadas da semana — sempre com contato direto com a loja.",
      a4s: "Marcas que buscam parcerias com comércios da Tríplice Fronteira.",
      q: "<b>O comércio local merece visibilidade.</b> A Evernear aproxima lojas, promos e contato direto.",
      cta: "Some seu comércio",
      comingP:
        "Diretório de comércios locais com promos ativas na Tríplice Fronteira. Filtre por cidade e segmento.",
      filterCtx: "gerenciadas por referência local",
      comingNote:
        "A Evernear não processa pagamentos. Contatos e promos vão ao comércio que publica.",
      contactWho: "comércio",
      joinWho: "você tem um comércio local",
      regionDetail: "cidade, segmento e promos ativas",
      emptyDim: "segmento",
    },
    en: {
      disclaimer:
        "Evernear does not process payments or manage orders. You always contact the shop that published.",
      s1p: `Local shops and active promos from ${CITIES_EN}.`,
      s2p: "By city and category to find deals and stores in seconds.",
      a1s: "Visibility, customers and promos managed by the shop itself.",
      a2s: "Real offers with local context, more up to date than a generic map.",
      a3: "Weekly flyer",
      a3s: "Highlighted promos of the week — always with direct contact with the store.",
      a4s: "Brands seeking partnerships with shops across the Triple Border.",
      q: "<b>Local commerce deserves visibility.</b> Evernear brings shops, promos and direct contact together.",
      cta: "Add your shop",
      comingP:
        "Directory of local shops with active promos across the Triple Border. Filter by city and category.",
      filterCtx: "managed with local reference",
      comingNote:
        "Evernear does not process payments. Contacts and promos go to the shop that published.",
      contactWho: "shop",
      joinWho: "you run a local shop",
      regionDetail: "city, category and active promos",
      emptyDim: "category",
    },
  }),
  education: mk("education", {
    es: {
      disclaimer:
        "Evernear no inscribe ni certifica cursos. Siempre contactás a la institución que publica.",
      s1p: `Cursos, programas y becas de ${CITIES}.`,
      s2p: "Por ciudad y tipo de formación para encontrar opciones en segundos.",
      a1s: "Visibilidad, inscripciones y conexión con estudiantes de la región.",
      a2s: "Programas accesibles para quien vive acá o visita la Triple Frontera.",
      a3: "Becas e intercambios",
      a3s: "Oportunidades de financiamiento y movilidad — siempre con contacto directo.",
      a4s: "Instituciones que buscan alianzas educativas cross-border.",
      q: "<b>Aprender también cruza fronteras.</b> Evernear acerca programas y contacto directo.",
      cta: "Sumá tu programa o institución",
      comingP:
        "Directorio de programas y cursos en la Triple Frontera. Filtrá por ciudad y tipo de formación.",
      filterCtx: "con información de referencia",
      comingNote:
        "Evernear no inscribe ni certifica. Los contactos van a la institución que publica.",
      contactWho: "institución",
      joinWho: "ofrecés formación o becas",
      regionDetail: "ciudad y tipo de programa",
      emptyDim: "tipo",
    },
    pt: {
      disclaimer:
        "A Evernear não inscreve nem certifica cursos. Você sempre fala com a instituição que publica.",
      s1p: `Cursos, programas e bolsas de ${CITIES_PT}.`,
      s2p: "Por cidade e tipo de formação para achar opções em segundos.",
      a1s: "Visibilidade, inscrições e conexão com estudantes da região.",
      a2s: "Programas acessíveis para quem mora aqui ou visita a Tríplice Fronteira.",
      a3: "Bolsas e intercâmbios",
      a3s: "Oportunidades de financiamento e mobilidade — sempre com contato direto.",
      a4s: "Instituições que buscam parcerias educacionais cross-border.",
      q: "<b>Aprender também cruza fronteiras.</b> A Evernear aproxima programas e contato direto.",
      cta: "Some seu programa ou instituição",
      comingP:
        "Diretório de programas e cursos na Tríplice Fronteira. Filtre por cidade e tipo de formação.",
      filterCtx: "com informação de referência",
      comingNote:
        "A Evernear não inscreve nem certifica. Os contatos vão à instituição que publica.",
      contactWho: "instituição",
      joinWho: "você oferece formação ou bolsas",
      regionDetail: "cidade e tipo de programa",
      emptyDim: "tipo",
    },
    en: {
      disclaimer:
        "Evernear does not enroll or certify courses. You always contact the institution that published.",
      s1p: `Courses, programs and scholarships from ${CITIES_EN}.`,
      s2p: "By city and training type to find options in seconds.",
      a1s: "Visibility, enrollment and connection with students in the region.",
      a2s: "Accessible programs for residents and visitors across the Triple Border.",
      a3: "Scholarships and exchanges",
      a3s: "Funding and mobility opportunities — always with direct contact.",
      a4s: "Institutions seeking cross-border educational partnerships.",
      q: "<b>Learning crosses borders too.</b> Evernear brings programs and direct contact together.",
      cta: "Add your program or institution",
      comingP:
        "Directory of programs and courses across the Triple Border. Filter by city and training type.",
      filterCtx: "with reference information",
      comingNote:
        "Evernear does not enroll or certify. Contacts go to the institution that published.",
      contactWho: "institution",
      joinWho: "you offer training or scholarships",
      regionDetail: "city and program type",
      emptyDim: "type",
    },
  }),
  events: mk("events", {
    es: {
      disclaimer:
        "Evernear no vende entradas ni gestiona inscripciones. Siempre contactás a quien organiza el evento.",
      s1p: `Eventos, festivales y encuentros de ${CITIES}.`,
      s2p: "Por ciudad y tipo de evento para encontrar agenda en segundos.",
      a1s: "Visibilidad, convocatoria y conexión con la comunidad regional.",
      a2s: "Agenda descentralizada donde cualquiera puede publicar su propio evento.",
      a3: "Encuentros comunitarios",
      a3s: "Ferias, talleres y actividades barriales — siempre con contacto directo.",
      a4s: "Marcas y aliados que buscan eventos alineados con su propuesta.",
      q: "<b>La agenda regional está dispersa.</b> Evernear la concentra con contacto directo.",
      cta: "Publicá tu evento",
      comingP:
        "Calendario regional de eventos en la Triple Frontera. Filtrá por ciudad y tipo.",
      filterCtx: "con información de referencia",
      comingNote:
        "Evernear no vende entradas. Los contactos van al organizador del evento.",
      contactWho: "organizador",
      joinWho: "organizás eventos",
      regionDetail: "ciudad, fecha y organizador",
      emptyDim: "tipo",
    },
    pt: {
      disclaimer:
        "A Evernear não vende ingressos nem gerencia inscrições. Você sempre fala com quem organiza o evento.",
      s1p: `Eventos, festivais e encontros de ${CITIES_PT}.`,
      s2p: "Por cidade e tipo de evento para achar agenda em segundos.",
      a1s: "Visibilidade, convocação e conexão com a comunidade regional.",
      a2s: "Agenda descentralizada onde qualquer pessoa pode publicar seu próprio evento.",
      a3: "Encontros comunitários",
      a3s: "Feiras, oficinas e atividades de bairro — sempre com contato direto.",
      a4s: "Marcas e aliados que buscam eventos alinhados à sua proposta.",
      q: "<b>A agenda regional está dispersa.</b> A Evernear a concentra com contato direto.",
      cta: "Publique seu evento",
      comingP:
        "Calendário regional de eventos na Tríplice Fronteira. Filtre por cidade e tipo.",
      filterCtx: "com informação de referência",
      comingNote:
        "A Evernear não vende ingressos. Os contatos vão ao organizador do evento.",
      contactWho: "organizador",
      joinWho: "você organiza eventos",
      regionDetail: "cidade, data e organizador",
      emptyDim: "tipo",
    },
    en: {
      disclaimer:
        "Evernear does not sell tickets or manage registrations. You always contact whoever organizes the event.",
      s1p: `Events, festivals and gatherings from ${CITIES_EN}.`,
      s2p: "By city and event type to find the agenda in seconds.",
      a1s: "Visibility, outreach and connection with the regional community.",
      a2s: "A decentralized calendar where anyone can publish their own event.",
      a3: "Community gatherings",
      a3s: "Fairs, workshops and neighborhood activities — always with direct contact.",
      a4s: "Brands and partners seeking events aligned with their proposal.",
      q: "<b>The regional agenda is scattered.</b> Evernear brings it together with direct contact.",
      cta: "Publish your event",
      comingP:
        "Regional events calendar across the Triple Border. Filter by city and type.",
      filterCtx: "with reference information",
      comingNote:
        "Evernear does not sell tickets. Contacts go to the event organizer.",
      contactWho: "organizer",
      joinWho: "you organize events",
      regionDetail: "city, date and organizer",
      emptyDim: "type",
    },
  }),
  discovery: mk("discovery", {
    es: {
      disclaimer:
        "Evernear no gestiona contrataciones ni procesa postulaciones. Siempre contactás a quien publica.",
      s1p: `Personas, empresas y oportunidades de ${CITIES}.`,
      s2p: "Por ciudad y tipo para encontrar talento u oportunidades en segundos.",
      a1s: "Visibilidad profesional y conexión con oportunidades cross-border.",
      a2s: "Empresas que buscan talento y perfiles de la Triple Frontera.",
      a3: "Oportunidades laborales",
      a3s: "Búsquedas y proyectos abiertos — siempre con contacto directo.",
      a4s: "Redes y aliados que quieren ampliar conexiones regionales.",
      q: "<b>El talento regional está disperso.</b> Evernear lo acerca a quien busca y a quien puede colaborar.",
      cta: "Sumá tu perfil u oportunidad",
      comingP:
        "Red de talento y oportunidades en la Triple Frontera. Filtrá por ciudad y tipo.",
      filterCtx: "con perfiles de referencia",
      comingNote:
        "Evernear no gestiona contrataciones. Los contactos van a quien publica.",
      contactWho: "perfil o empresa",
      joinWho: "querés aparecer en la red regional",
      regionDetail: "ciudad y tipo de perfil u oportunidad",
      emptyDim: "tipo",
    },
    pt: {
      disclaimer:
        "A Evernear não gerencia contratações nem processa candidaturas. Você sempre fala com quem publica.",
      s1p: `Pessoas, empresas e oportunidades de ${CITIES_PT}.`,
      s2p: "Por cidade e tipo para achar talento ou oportunidades em segundos.",
      a1s: "Visibilidade profissional e conexão com oportunidades cross-border.",
      a2s: "Empresas que buscam talento e perfis da Tríplice Fronteira.",
      a3: "Oportunidades de trabalho",
      a3s: "Vagas e projetos abertos — sempre com contato direto.",
      a4s: "Redes e aliados que querem ampliar conexões regionais.",
      q: "<b>O talento regional está disperso.</b> A Evernear aproxima quem busca e quem pode colaborar.",
      cta: "Some seu perfil ou oportunidade",
      comingP:
        "Rede de talento e oportunidades na Tríplice Fronteira. Filtre por cidade e tipo.",
      filterCtx: "com perfis de referência",
      comingNote:
        "A Evernear não gerencia contratações. Os contatos vão a quem publica.",
      contactWho: "perfil ou empresa",
      joinWho: "você quer aparecer na rede regional",
      regionDetail: "cidade e tipo de perfil ou oportunidade",
      emptyDim: "tipo",
    },
    en: {
      disclaimer:
        "Evernear does not manage hiring or process applications. You always contact whoever published.",
      s1p: `People, companies and opportunities from ${CITIES_EN}.`,
      s2p: "By city and type to find talent or opportunities in seconds.",
      a1s: "Professional visibility and connection with cross-border opportunities.",
      a2s: "Companies seeking talent and profiles from the Triple Border.",
      a3: "Job opportunities",
      a3s: "Open searches and projects — always with direct contact.",
      a4s: "Networks and partners looking to expand regional connections.",
      q: "<b>Regional talent is scattered.</b> Evernear brings together those who search and those who can collaborate.",
      cta: "Add your profile or opportunity",
      comingP:
        "Talent and opportunity network across the Triple Border. Filter by city and type.",
      filterCtx: "with reference profiles",
      comingNote:
        "Evernear does not manage hiring. Contacts go to whoever published.",
      contactWho: "profile or company",
      joinWho: "you want to appear in the regional network",
      regionDetail: "city and profile or opportunity type",
      emptyDim: "type",
    },
  }),
  innovation: mk("innovation", {
    es: {
      disclaimer:
        "Evernear no invierte ni acelera startups. Siempre contactás al organizador o ecosistema que publica.",
      s1p: `Universidades, bootcamps, meetups y ecosistemas tech de la Triple Frontera.`,
      s2p: "Por ciudad y pilar para encontrar comunidad tech en segundos.",
      a1s: "Visibilidad, talento estudiantil y conexión con el ecosistema regional.",
      a2s: "Comunidades tech que buscan espacio y referencia cross-border.",
      a3: "Meetups y demos",
      a3s: "Encuentros, hackathons y demo days — siempre con contacto directo.",
      a4s: "Empresas y aliados que buscan talento e innovación local.",
      q: "<b>La innovación también nace en la frontera.</b> Evernear acerca ecosistemas y contacto directo.",
      cta: "Sumá tu proyecto o espacio tech",
      comingP:
        "Ecosistema tech regional en la Triple Frontera. Filtrá por ciudad y pilar de innovación.",
      filterCtx: "con iniciativas de referencia",
      comingNote:
        "Evernear no invierte ni acelera. Los contactos van al organizador que publica.",
      contactWho: "organizador",
      joinWho: "tenés un proyecto o espacio tech",
      regionDetail: "ciudad y tipo de iniciativa tech",
      emptyDim: "pilar",
    },
    pt: {
      disclaimer:
        "A Evernear não investe nem acelera startups. Você sempre fala com o organizador ou ecossistema que publica.",
      s1p: `Universidades, bootcamps, meetups e ecossistemas tech da Tríplice Fronteira.`,
      s2p: "Por cidade e pilar para achar comunidade tech em segundos.",
      a1s: "Visibilidade, talento estudantil e conexão com o ecossistema regional.",
      a2s: "Comunidades tech que buscam espaço e referência cross-border.",
      a3: "Meetups e demos",
      a3s: "Encontros, hackathons e demo days — sempre com contato direto.",
      a4s: "Empresas e aliados que buscam talento e inovação local.",
      q: "<b>A inovação também nasce na fronteira.</b> A Evernear aproxima ecossistemas e contato direto.",
      cta: "Some seu projeto ou espaço tech",
      comingP:
        "Ecossistema tech regional na Tríplice Fronteira. Filtre por cidade e pilar de inovação.",
      filterCtx: "com iniciativas de referência",
      comingNote:
        "A Evernear não investe nem acelera. Os contatos vão ao organizador que publica.",
      contactWho: "organizador",
      joinWho: "você tem um projeto ou espaço tech",
      regionDetail: "cidade e tipo de iniciativa tech",
      emptyDim: "pilar",
    },
    en: {
      disclaimer:
        "Evernear does not invest in or accelerate startups. You always contact the organizer or ecosystem that published.",
      s1p: `Universities, bootcamps, meetups and tech ecosystems across the Triple Border.`,
      s2p: "By city and pillar to find the tech community in seconds.",
      a1s: "Visibility, student talent and connection with the regional ecosystem.",
      a2s: "Tech communities seeking space and cross-border reference.",
      a3: "Meetups and demos",
      a3s: "Gatherings, hackathons and demo days — always with direct contact.",
      a4s: "Companies and partners seeking local talent and innovation.",
      q: "<b>Innovation is born at the border too.</b> Evernear brings ecosystems and direct contact together.",
      cta: "Add your project or tech space",
      comingP:
        "Regional tech ecosystem across the Triple Border. Filter by city and innovation pillar.",
      filterCtx: "with reference initiatives",
      comingNote:
        "Evernear does not invest or accelerate. Contacts go to whoever published.",
      contactWho: "organizer",
      joinWho: "you run a project or tech space",
      regionDetail: "city and tech initiative type",
      emptyDim: "pillar",
    },
  }),
};

function mk(_prefix, langs) {
  const gn = gnFromEs(langs.es);
  return { ...langs, gn };
}

function gnFromEs(es) {
  return {
    disclaimer: es.disclaimer
      .replace(/Evernear no /g, "Evernear ndo")
      .replace(/Siempre contactás/g, "Eñe'ẽ tapo")
      .replace(/\. /g, ". "),
    s1p: es.s1p.replace(/ de /g, " ").replace(/\./g, "-gui."),
    s2p: es.s2p
      .replace(/Por ciudad y /g, "Táva ha ")
      .replace(/para encontrar/g, "ehecha")
      .replace(/ en segundos/g, ""),
    a1s: es.a1s.replace(/Visibilidad/g, "Jehecha"),
    a2s: es.a2s,
    a3: es.a3,
    a3s: es.a3s.replace(/siempre con contacto directo/g, "contacto directo"),
    a4s: es.a4s,
    q: es.q.replace(/Evernear acerca/g, "Evernear omyendy").replace(/lo acerca/g, "omyendy"),
    cta: es.cta.replace(/Sumá/g, "Emoĩ").replace(/Publicá/g, "Emoĩ"),
    comingP: es.comingP.replace(/Filtrá/g, "Efiltro").replace(/Directorio/g, "Directorio"),
    filterCtx: es.filterCtx,
    comingNote: es.comingNote.replace(/Los contactos/g, "Contacto").replace(/Evernear no/g, "Evernear ndo"),
    contactWho: es.contactWho,
    joinWho: es.joinWho.replace(/tenés/g, "reguerekóramo").replace(/organizás/g, "reorganiza").replace(/ofrecés/g, "reme'ẽ").replace(/querés/g, "reipotá"),
    regionDetail: es.regionDetail,
    emptyDim: es.emptyDim,
  };
}

export function buildGuideBlock(lang, prefix) {
  const cfg = LOCALIZED_GUIDES[prefix][lang];
  const sh = SHELL[lang];
  return {
    "guide.disclaimer": cfg.disclaimer,
    "guide.path.aria": sh.pathAria,
    "guide.s1": sh.s1,
    "guide.s1.p": cfg.s1p,
    "guide.s2": sh.s2,
    "guide.s2.p": cfg.s2p,
    "guide.s3": sh.s3,
    "guide.s3.p": sh.contactP(cfg.contactWho),
    "guide.s4": sh.s4,
    "guide.s4.p": sh.joinP(cfg.joinWho),
    "guide.audience.h": sh.audienceH,
    "guide.a1.s": cfg.a1s,
    "guide.a2.s": cfg.a2s,
    "guide.a3": cfg.a3,
    "guide.a3.s": cfg.a3s,
    "guide.a4.s": cfg.a4s,
    "guide.region.h": sh.regionH,
    "guide.region.p": sh.regionP(cfg.regionDetail),
    "guide.q": cfg.q,
    "guide.cta": cfg.cta,
    "coming.p": cfg.comingP,
    "coming.filter.note": sh.filterNote(cfg.filterCtx),
    "coming.empty": sh.empty(cfg.emptyDim),
    "coming.note": cfg.comingNote,
  };
}
