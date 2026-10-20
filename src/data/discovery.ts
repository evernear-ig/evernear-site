import type { Opportunity, Profile } from "@/lib/ecosystem/types";

export const PROFILES: Profile[] = [
  {
    id: "maria-dev",
    name: "María G.",
    role: "Desarrolladora Full Stack",
    cityId: "pi",
    country: "ar",
    skills: ["React", "Node.js", "TypeScript"],
    quote: "Quiero construir con personas de los tres países.",
    imageKey: "people.developer",
  },
  {
    id: "joao-ent",
    name: "João S.",
    role: "Emprendedor",
    cityId: "foz",
    country: "br",
    skills: ["Startups", "Turismo", "Producto"],
    quote: "La frontera es nuestra ventaja, no nuestro límite.",
    imageKey: "people.entrepreneur",
  },
  {
    id: "ana-cde",
    name: "Ana R.",
    role: "Comerciante",
    cityId: "cde",
    country: "py",
    skills: ["Retail", "Importación", "Ventas"],
    quote: "Conecto productos de tres países con mis clientes.",
    imageKey: "people.business",
  },
  {
    id: "lucas-student",
    name: "Lucas M.",
    role: "Estudiante de Ingeniería",
    cityId: "foz",
    country: "br",
    skills: ["Python", "IA", "Investigación"],
    quote: "Busco un equipo para mi primer proyecto.",
    imageKey: "people.student",
  },
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "dev-remoto-regional",
    title: "Desarrollador/a React — Remoto Regional",
    company: "Startup Trifronteriza",
    cityId: "pi",
    type: "empleo",
    modality: "remoto",
    description:
      "Buscamos dev React para producto que conecta comercios de la Triple Frontera. Remoto con encuentros presenciales mensuales.",
  },
  {
    id: "pasantia-turismo",
    title: "Pasantía en Turismo Digital",
    company: "Ente Municipal de Turismo (candidato)",
    cityId: "pi",
    type: "pasantia",
    modality: "hibrido",
    description:
      "Pasantía para estudiantes interesados en turismo digital y contenido regional.",
  },
  {
    id: "colaboracion-blockchain",
    title: "Colaboración — Meetup Blockchain",
    company: "Comunidad Evernear",
    cityId: "foz",
    type: "colaboracion",
    modality: "presencial",
    description:
      "Buscamos speakers y organizadores para meetup mensual de blockchain en la región.",
  },
];
