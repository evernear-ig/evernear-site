import fs from "fs";

const path = "src/lib/i18n/translations.ts";
let src = fs.readFileSync(path, "utf8");

const match = src.match(/export const I18N = ([\s\S]+) as const;/);
if (!match) throw new Error("Could not parse I18N");
const I18N = eval(`(${match[1]})`);

const NEW_ES = {
  "meta.title": "CONEXA — Descubrí tu región",
  "meta.desc":
    "CONEXA es la plataforma para descubrir deporte, salud, solidaridad, comercio, turismo e innovación en tu región. Empezamos en la Triple Frontera.",
  "brand.desc": "Descubrí tu región",
  "hero.sub":
    "CONEXA conecta deporte, salud, solidaridad, comercio, turismo e innovación en un solo lugar. Empezamos en la Triple Frontera de Argentina, Brasil y Paraguay.",
  "cta.join": "Unite a CONEXA",
  "cta.explore": "Explorar CONEXA",
  "city.pi":
    "Primera región de CONEXA. Puerta argentina a la región, junto a las Cataratas del Iguazú.",
  "border.lead":
    "CONEXA nace donde el Paraná y el Iguazú se abrazan — y con ellos, tres países. Argentina, Brasil, Paraguay conviven a metros de distancia, con miles de personas cruzando la frontera cada día para trabajar, estudiar y vivir.",
  "border.p1":
    "Ahí, donde otros ven un límite, nosotros vemos un puente. Así nace CONEXA: el lugar donde se descubre todo lo que pasa en la región.",
  "ppl.lead":
    "Detrás de cada nodo hay alguien con una idea, un club, una causa o un proyecto. Así se ve CONEXA cuando se mira de cerca.",
  "ppl.note":
    "Perfiles representativos del MVP con fotografía temporal. No son miembros de CONEXA. Las imágenes se reemplazarán por fotografía real de la comunidad y la región.",
  "ppl.athlete": "Deportista",
  "ppl.athlete.q": "“Quiero que mi club y mi deporte sean visibles en la región.”",
  "ppl.foundation": "Fundación",
  "ppl.foundation.q": "“Queremos que más personas descubran nuestra causa.”",
  "pil.lead":
    "La innovación en CONEXA se apoya en cuatro pilares. No son cuatro servicios: son un sistema. Cada uno alimenta al siguiente.",
  "found.lead":
    "Sumate a la CONEXA Founding Community — como persona, club, fundación u organización. Todavía no hay alianzas confirmadas: estas son las puertas abiertas.",
  "found.sub": "Formá parte de la CONEXA Founding Community.",
  "found.p":
    "No es una suscripción a un newsletter. Es sumarse al comienzo de algo. CONEXA se construye con quienes creen en descubrir y conectar su región.",
  "part.lead":
    "CONEXA se está construyendo para conectar clubes, instituciones, fundaciones y organizaciones de la región y del mundo. Todavía no hay alianzas confirmadas: estas son las puertas abiertas.",
  "part.1": "Deporte y clubes",
  "part.1.p":
    "Clubes, ligas y proyectos deportivos que quieran visibilidad y conexión con auspiciantes y la comunidad.",
  "part.2": "Salud e instituciones",
  "part.2.p":
    "Hospitales, centros de salud y profesionales que quieran aparecer en un directorio informativo regional.",
  "part.3": "Solidaridad y fundaciones",
  "part.3.p":
    "Fundaciones, causas y organizaciones sociales que buscan visibilidad — sin cobrar donaciones en CONEXA.",
  "part.4": "Innovación y educación",
  "part.4.p":
    "Universidades, bootcamps, meetups y ecosistemas tech que quieran conectar con la región.",
  "foot.p":
    "Descubrí tu región. CONEXA conecta deporte, salud, solidaridad, comercio, turismo e innovación — empezamos en la Triple Frontera.",
  "foot.line": "Nace en la Triple Frontera. Crece con cada región.",
  "eco.index.h": "Descubrí el ecosistema de tu región",
  "eco.index.lead":
    "Deporte, salud, solidaridad, turismo, comercios, educación, eventos e innovación — cada área tiene su espacio en CONEXA.",
  "areas.h": "Un ecosistema para<br>descubrir.",
  "areas.lead":
    "Deporte, salud, solidaridad, comercio, turismo e innovación — todo en un solo mapa. CONEXA es solo informativa: contactá siempre al organizador.",
  "areas.seeAll": "Ver todo el ecosistema",
  "areas.featured": "Destacado",
  "nav.family.community": "Vida y comunidad",
  "nav.family.region": "Región y oportunidades",
  "nav.sport": "Deporte",
  "nav.health": "Salud",
  "nav.wellness": "Bienestar",
  "nav.communication": "Comunicación",
  "nav.solidarity": "Solidaridad",
  "nav.innovation": "Innovación",
  "eco.sport.h": "Deporte y talento",
  "eco.sport.lead":
    "Clubes, deportistas y convocatorias de la región — incluidos proyectos que buscan apoyo o auspicio.",
  "eco.health.h": "Salud",
  "eco.health.lead":
    "Directorio informativo de instituciones y profesionales. CONEXA no presta servicios de salud.",
  "eco.wellness.h": "Bienestar y psicología",
  "eco.wellness.lead":
    "Espacios y recursos de bienestar. Información y contacto directo — sin consultas en la plataforma.",
  "eco.communication.h": "Comunicación",
  "eco.communication.lead":
    "Medios, proyectos y voces de la región que quieren ser descubiertas.",
  "eco.solidarity.h": "Solidaridad",
  "eco.solidarity.lead":
    "Causas, fundaciones, auspiciantes y rifas informativas. La acción concreta ocurre con el organizador.",
  "eco.innovation.h": "Innovación y tecnología",
  "eco.innovation.lead":
    "Aprender, conectar, construir y acceder — el ecosistema tech de la región en CONEXA.",
  "eco.catalog.solidarity": "Causas y proyectos",
  "solidarity.kind.sponsorship": "Busca auspiciantes",
  "solidarity.kind.raffle": "Rifa informativa",
  "solidarity.kind.foundation": "Fundación aliada",
  "solidarity.cta.note":
    "Los enlaces y contactos llevan al organizador. CONEXA no procesa donaciones ni vende números de rifa.",
  "legal.terms": "Términos de uso",
  "legal.privacy": "Privacidad",
  "legal.terms.p1":
    "CONEXA es una plataforma de descubrimiento e información. No organizamos rifas, no cobramos donaciones ni prestamos servicios de salud o psicología.",
  "legal.terms.p2":
    "El contenido publicado es responsabilidad de quien lo ofrece. Verificá siempre con el organizador antes de donar, comprar o contratar.",
  "legal.terms.p3":
    "Empezamos en la Triple Frontera; la marca CONEXA está pensada para crecer a más regiones y ciudades.",
  "legal.privacy.p1":
    "Recopilamos solo los datos que nos compartís al unirte o contactar (nombre, email, ciudad, etc.).",
  "legal.privacy.p2":
    "No vendemos tus datos. Podemos usar tu email para novedades de CONEXA si te sumaste a la comunidad fundadora.",
  "legal.privacy.p3":
    "Para ejercer acceso o baja, escribinos a hello@conexa.org.",
  "legal.vertical.disclaimer":
    "Solo informativo: CONEXA no presta este servicio. Contactá directamente al organizador o profesional.",
  "legal.solidarity.disclaimer":
    "CONEXA muestra causas para que las descubras. Donaciones, rifas y auspicios se gestionan fuera de la plataforma, con quien organiza cada proyecto.",
  "a11y.home": "CONEXA, inicio",
  "a11y.trinode":
    "Tres puntos conectados que representan Argentina, Brasil y Paraguay encontrándose en CONEXA",
  "a11y.map":
    "Mapa abstracto de la Triple Frontera: Argentina al sur, Brasil al este, Paraguay al oeste, conectados en CONEXA",
  "form.ok.p":
    "Ya sos parte del camino de CONEXA. Te vamos a escribir con novedades sobre los primeros pasos del ecosistema.",
  "why.l3":
    "CONEXA nació en la Triple Frontera para que personas y organizaciones se descubran en un solo lugar.",
  "tourism.regional.lead":
    "La Triple Frontera es más que las Cataratas. CONEXA conecta experiencias entre Argentina, Brasil y Paraguay.",
  "panfleto.biz.lead":
    "Contá qué promo tenés esta semana y aparecé en el email a usuarios de CONEXA.",
};

const NEW_PT = {
  "meta.title": "CONEXA — Descubra sua região",
  "meta.desc":
    "CONEXA é a plataforma para descobrir esporte, saúde, solidariedade, comércio, turismo e inovação na sua região. Começamos na Tríplice Fronteira.",
  "brand.desc": "Descubra sua região",
  "hero.sub":
    "CONEXA conecta esporte, saúde, solidariedade, comércio, turismo e inovação em um só lugar. Começamos na Tríplice Fronteira entre Argentina, Brasil e Paraguai.",
  "cta.join": "Junte-se à CONEXA",
  "cta.explore": "Explorar CONEXA",
  "nav.family.community": "Vida e comunidade",
  "nav.family.region": "Região e oportunidades",
  "nav.sport": "Esporte",
  "nav.health": "Saúde",
  "nav.wellness": "Bem-estar",
  "nav.communication": "Comunicação",
  "nav.solidarity": "Solidariedade",
  "nav.innovation": "Inovação",
  "areas.h": "Um ecossistema para<br>descobrir.",
  "areas.lead":
    "Esporte, saúde, solidariedade, comércio, turismo e inovação — tudo em um mapa. CONEXA é apenas informativa.",
  "areas.seeAll": "Ver todo o ecossistema",
  "areas.featured": "Destaque",
  "eco.index.h": "Descubra o ecossistema da sua região",
  "eco.index.lead":
    "Esporte, saúde, solidariedade, turismo, comércios, educação, eventos e inovação — cada área tem seu espaço na CONEXA.",
  "foot.p":
    "Descubra sua região. CONEXA conecta esporte, saúde, solidariedade, comércio, turismo e inovação — começamos na Tríplice Fronteira.",
  "legal.terms": "Termos de uso",
  "legal.privacy": "Privacidade",
  "legal.vertical.disclaimer":
    "Apenas informativo: a CONEXA não presta este serviço. Contate diretamente o organizador ou profissional.",
  "a11y.home": "CONEXA, início",
};

const NEW_EN = {
  "meta.title": "CONEXA — Discover your region",
  "meta.desc":
    "CONEXA helps you discover sports, health, solidarity, commerce, tourism and innovation in your region. We start at the Triple Border.",
  "brand.desc": "Discover your region",
  "hero.sub":
    "CONEXA connects sports, health, solidarity, commerce, tourism and innovation in one place. We start at the Triple Border of Argentina, Brazil and Paraguay.",
  "cta.join": "Join CONEXA",
  "cta.explore": "Explore CONEXA",
  "nav.family.community": "Community life",
  "nav.family.region": "Region and opportunities",
  "nav.sport": "Sports",
  "nav.health": "Health",
  "nav.wellness": "Wellness",
  "nav.communication": "Communication",
  "nav.solidarity": "Solidarity",
  "nav.innovation": "Innovation",
  "areas.h": "An ecosystem to<br>discover.",
  "areas.lead":
    "Sports, health, solidarity, commerce, tourism and innovation — all in one map. CONEXA is informational only.",
  "areas.seeAll": "See full ecosystem",
  "areas.featured": "Featured",
  "eco.index.h": "Discover your regional ecosystem",
  "eco.index.lead":
    "Sports, health, solidarity, tourism, commerce, education, events and innovation — each area has its place on CONEXA.",
  "foot.p":
    "Discover your region. CONEXA connects sports, health, solidarity, commerce, tourism and innovation — starting at the Triple Border.",
  "legal.terms": "Terms of use",
  "legal.privacy": "Privacy",
  "legal.vertical.disclaimer":
    "Informational only: CONEXA does not provide this service. Contact the organizer or professional directly.",
  "a11y.home": "CONEXA, home",
};

function patchLang(lang, overrides) {
  const bucket = { ...I18N[lang] };
  for (const [k, v] of Object.entries(bucket)) {
    if (typeof v === "string") {
      bucket[k] = v
        .replaceAll("TRINEXUS", "CONEXA")
        .replaceAll("Trinexus", "CONEXA")
        .replaceAll("trinexus.org", "conexa.org");
    }
  }
  Object.assign(bucket, overrides);
  I18N[lang] = bucket;
}

patchLang("es", NEW_ES);
patchLang("pt", { ...NEW_PT, ...Object.fromEntries(
  Object.entries(NEW_ES).filter(([k]) => k.startsWith("eco.") || k.startsWith("legal.") || k.startsWith("solidarity."))
    .map(([k, v]) => [k, v.replace(/ón/g, "ão").replace(/ar /g, "ar ")]) // minimal; pt overrides above are primary
)});
// Merge full eco/legal keys into pt from ES as fallback then override
for (const [k, v] of Object.entries(NEW_ES)) {
  if (!I18N.pt[k]) I18N.pt[k] = typeof v === "string" ? v.replaceAll("TRINEXUS", "CONEXA") : v;
}
Object.assign(I18N.pt, NEW_PT);

for (const [k, v] of Object.entries(NEW_ES)) {
  if (!I18N.en[k]) I18N.en[k] = typeof v === "string" ? v.replaceAll("TRINEXUS", "CONEXA") : v;
}
Object.assign(I18N.en, NEW_EN);

for (const lang of ["gn"]) {
  patchLang(lang, {});
  if (!I18N[lang]["brand.desc"]) I18N[lang]["brand.desc"] = "Ehechajey ne retãme";
}

const out = `export const I18N = ${JSON.stringify(I18N, null, 2)} as const;\n`;
fs.writeFileSync(path, out);
console.log("Patched translations for CONEXA");
