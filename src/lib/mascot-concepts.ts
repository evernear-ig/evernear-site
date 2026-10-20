import type { MascotPose } from "@/lib/mascot-poses";

export type MascotConcept =
  | "default"
  | "border"
  | "people"
  | "ecosystem"
  | "join"
  | "deporte"
  | "salud"
  | "innovacion"
  | "solidaridad"
  | "turismo"
  | "comercios"
  | "bienestar"
  | "comunicacion"
  | "educacion";

export type MascotConceptTokens = {
  accent: string;
  accentSoft: string;
  nodeA: string;
  nodeB: string;
  orbitSpeed: number;
  pulse: boolean;
  hint: string;
};

export const MASCOT_CONCEPTS: Record<MascotConcept, MascotConceptTokens> = {
  default: {
    accent: "#2EE59D",
    accentSoft: "#8A6DE6",
    nodeA: "#2EE59D",
    nodeB: "#C77DFF",
    orbitSpeed: 1,
    pulse: false,
    hint: "Conexión",
  },
  border: {
    accent: "#74ACDF",
    accentSoft: "#2EE59D",
    nodeA: "#74ACDF",
    nodeB: "#009C3B",
    orbitSpeed: 1.1,
    pulse: false,
    hint: "Triple frontera",
  },
  people: {
    accent: "#2EE59D",
    accentSoft: "#F6F7FB",
    nodeA: "#2EE59D",
    nodeB: "#8A6DE6",
    orbitSpeed: 0.9,
    pulse: false,
    hint: "Comunidad",
  },
  ecosystem: {
    accent: "#8A6DE6",
    accentSoft: "#2EE59D",
    nodeA: "#2EE59D",
    nodeB: "#8A6DE6",
    orbitSpeed: 1.2,
    pulse: true,
    hint: "Ecosistema",
  },
  join: {
    accent: "#2EE59D",
    accentSoft: "#4B2FA6",
    nodeA: "#2EE59D",
    nodeB: "#F6F7FB",
    orbitSpeed: 0.85,
    pulse: true,
    hint: "Unite",
  },
  deporte: {
    accent: "#FF6B4A",
    accentSoft: "#2EE59D",
    nodeA: "#FF6B4A",
    nodeB: "#FFD166",
    orbitSpeed: 1.6,
    pulse: false,
    hint: "Deporte",
  },
  salud: {
    accent: "#5CE1C5",
    accentSoft: "#2EE59D",
    nodeA: "#5CE1C5",
    nodeB: "#8A6DE6",
    orbitSpeed: 0.75,
    pulse: true,
    hint: "Salud",
  },
  innovacion: {
    accent: "#8A6DE6",
    accentSoft: "#2EE59D",
    nodeA: "#8A6DE6",
    nodeB: "#00D4FF",
    orbitSpeed: 1.35,
    pulse: true,
    hint: "Innovación",
  },
  solidaridad: {
    accent: "#FF7EB6",
    accentSoft: "#2EE59D",
    nodeA: "#FF7EB6",
    nodeB: "#8A6DE6",
    orbitSpeed: 0.95,
    pulse: true,
    hint: "Solidaridad",
  },
  turismo: {
    accent: "#4ECDC4",
    accentSoft: "#74ACDF",
    nodeA: "#4ECDC4",
    nodeB: "#FFD166",
    orbitSpeed: 1.15,
    pulse: false,
    hint: "Turismo",
  },
  comercios: {
    accent: "#FFD166",
    accentSoft: "#2EE59D",
    nodeA: "#FFD166",
    nodeB: "#8A6DE6",
    orbitSpeed: 1,
    pulse: false,
    hint: "Comercios",
  },
  bienestar: {
    accent: "#A8E6CF",
    accentSoft: "#8A6DE6",
    nodeA: "#A8E6CF",
    nodeB: "#5CE1C5",
    orbitSpeed: 0.7,
    pulse: true,
    hint: "Bienestar",
  },
  comunicacion: {
    accent: "#00D4FF",
    accentSoft: "#8A6DE6",
    nodeA: "#00D4FF",
    nodeB: "#2EE59D",
    orbitSpeed: 1.25,
    pulse: false,
    hint: "Comunicación",
  },
  educacion: {
    accent: "#8A6DE6",
    accentSoft: "#FFD166",
    nodeA: "#8A6DE6",
    nodeB: "#2EE59D",
    orbitSpeed: 1.05,
    pulse: false,
    hint: "Educación",
  },
};

const PATH_CONCEPT: Record<string, MascotConcept> = {
  deporte: "deporte",
  salud: "salud",
  innovacion: "innovacion",
  solidaridad: "solidaridad",
  turismo: "turismo",
  comercios: "comercios",
  bienestar: "bienestar",
  comunicacion: "comunicacion",
  educacion: "educacion",
};

export function conceptFromPathname(pathname: string): MascotConcept {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  for (const [slug, concept] of Object.entries(PATH_CONCEPT)) {
    if (path === `/${slug}` || path.startsWith(`/${slug}/`)) return concept;
  }
  return "default";
}

export type EvernearJourneyStepPayload = {
  pose: MascotPose;
  concept: MascotConcept;
  sectionKey: string;
  tipKey: string;
  stepKey: string;
  anchorSelector?: string;
};
