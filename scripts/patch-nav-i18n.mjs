import fs from "fs";

const path = "src/lib/i18n/translations.ts";
const match = fs.readFileSync(path, "utf8").match(/export const I18N = ([\s\S]+) as const;/);
const I18N = eval(`(${match[1]})`);

const ES = {
  "nav.vision": "Visión, misión y objetivo",
  "nav.information": "Información",
  "nav.join.cta": "¿Querés sumarte?",
  "nav.family.seeAll": "Ver todas las áreas",
  "about.page.h": "Qué es Evernear",
  "about.page.lead":
    "Una plataforma para descubrir tu región — empezamos en la Triple Frontera y crecemos con cada nueva ciudad.",
  "about.vision.h": "Visión",
  "about.vision.p1":
    "Un mundo donde cada región tenga un lugar común para descubrir lo que pasa cerca: deporte, salud, solidaridad, comercio, cultura e innovación.",
  "about.vision.p2":
    "Evernear nace con esa visión global; la Triple Frontera es nuestra primera región.",
  "about.mission.h": "Misión",
  "about.mission.p1":
    "Descubrí tu región: conectar personas, organizaciones y causas en un solo mapa informativo.",
  "about.mission.p2":
    "Facilitamos visibilidad y contacto directo — sin cobrar, sin donar, sin intermediar en la plataforma.",
  "about.goals.h": "Objetivo",
  "about.goals.p1": "Que cualquier persona encuentre en segundos qué hay en su región.",
  "about.goals.p2":
    "Que clubes, fundaciones, comercios e instituciones tengan un espacio para ser descubiertos.",
  "about.goals.p3":
    "Crecer región a región manteniendo siempre el rol informativo de Evernear.",
  "info.page.h": "Información",
  "info.page.lead": "Cómo funciona Evernear y qué podés esperar de la plataforma.",
  "info.role.h": "Qué es Evernear",
  "info.role.p1":
    "Evernear es una plataforma de descubrimiento. Mostramos causas, eventos, comercios, servicios y proyectos para que los conozcas.",
  "info.role.p2":
    "No organizamos rifas, no procesamos donaciones ni prestamos salud o psicología. La acción concreta siempre es con quien publica.",
  "info.region.h": "Primera región",
  "info.region.p1":
    "Empezamos en la Triple Frontera: Puerto Iguazú, Foz do Iguaçu y Ciudad del Este.",
  "info.region.p2":
    "La marca está pensada para sumar más ciudades y países sin cambiar su esencia.",
  "info.how.h": "Cómo usar Evernear",
  "info.how.p1":
    "Explorá el ecosistema por áreas, entrá a cada vertical y contactá al organizador por el enlace o dato que figure.",
  "info.how.p2":
    "Si querés publicar o sumarte a la comunidad fundadora, usá el formulario en «¿Querés sumarte?».",
};

const PT = {
  "nav.vision": "Visão, missão e objetivo",
  "nav.information": "Informação",
  "nav.join.cta": "Quer se juntar?",
  "nav.family.seeAll": "Ver todas as áreas",
  "about.page.h": "O que é Evernear",
  "about.page.lead":
    "Uma plataforma para descobrir sua região — começamos na Tríplice Fronteira.",
  "about.vision.h": "Visão",
  "about.vision.p1":
    "Um mundo onde cada região tenha um lugar comum para descobrir o que acontece perto.",
  "about.vision.p2": "Evernear nasce com essa visão global; a Tríplice Fronteira é nossa primeira região.",
  "about.mission.h": "Missão",
  "about.mission.p1": "Descubra sua região: conectar pessoas, organizações e causas em um mapa informativo.",
  "about.mission.p2":
    "Facilitamos visibilidade e contato direto — sem cobrar, sem doar na plataforma.",
  "about.goals.h": "Objetivo",
  "about.goals.p1": "Que qualquer pessoa encontre em segundos o que há na sua região.",
  "about.goals.p2": "Que clubes, fundações e comércios tenham espaço para ser descobertos.",
  "about.goals.p3": "Crescer região a região mantendo o papel informativo da Evernear.",
  "info.page.h": "Informação",
  "info.page.lead": "Como a Evernear funciona e o que você pode esperar.",
  "info.role.h": "O que é Evernear",
  "info.role.p1": "Evernear é uma plataforma de descoberta informativa.",
  "info.role.p2": "Não organizamos rifas nem processamos doações na plataforma.",
  "info.region.h": "Primeira região",
  "info.region.p1": "Começamos na Tríplice Fronteira.",
  "info.region.p2": "A marca está pensada para crescer para mais cidades.",
  "info.how.h": "Como usar",
  "info.how.p1": "Explore o ecossistema por áreas e contate o organizador.",
  "info.how.p2": "Para publicar ou se juntar, use «Quer se juntar?».",
};

const EN = {
  "nav.vision": "Vision, mission and goals",
  "nav.information": "Information",
  "nav.join.cta": "Want to join?",
  "nav.family.seeAll": "See all areas",
  "about.page.h": "What is Evernear",
  "about.page.lead": "A platform to discover your region — starting at the Triple Border.",
  "about.vision.h": "Vision",
  "about.vision.p1": "A world where every region has one place to discover what happens nearby.",
  "about.vision.p2": "Evernear starts globally; the Triple Border is our first region.",
  "about.mission.h": "Mission",
  "about.mission.p1": "Discover your region: connect people, organizations and causes in one informational map.",
  "about.mission.p2": "We enable visibility and direct contact — no payments on the platform.",
  "about.goals.h": "Goals",
  "about.goals.p1": "Help anyone find what's in their region in seconds.",
  "about.goals.p2": "Give clubs, foundations and businesses a place to be discovered.",
  "about.goals.p3": "Grow region by region while staying informational only.",
  "info.page.h": "Information",
  "info.page.lead": "How Evernear works and what to expect.",
  "info.role.h": "What Evernear is",
  "info.role.p1": "Evernear is a discovery platform.",
  "info.role.p2": "We do not run raffles or process donations on the platform.",
  "info.region.h": "First region",
  "info.region.p1": "We start at the Triple Border.",
  "info.region.p2": "The brand is built to scale to more cities.",
  "info.how.h": "How to use Evernear",
  "info.how.p1": "Explore by area and contact the organizer directly.",
  "info.how.p2": "To publish or join, use «Want to join?».",
};

for (const lang of ["es", "pt", "en", "gn"]) {
  const patch = lang === "es" ? ES : lang === "pt" ? PT : lang === "en" ? EN : { ...ES };
  I18N[lang] = { ...I18N[lang], ...patch };
}

fs.writeFileSync(path, `export const I18N = ${JSON.stringify(I18N, null, 2)} as const;\n`);
console.log("Nav i18n patched");
