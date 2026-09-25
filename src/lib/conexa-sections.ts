import type { MascotConcept } from "@/lib/mascot-concepts";
import { conceptFromPathname } from "@/lib/mascot-concepts";
import type { MascotPose } from "@/lib/mascot-poses";

export type ConexaSectionConfig = {
  key: string;
  pose: MascotPose;
  concept: MascotConcept;
  tipKey: string;
  stepKey: string;
  id?: string;
  selector?: string;
};

export const CONEXA_HOME_SECTIONS: ConexaSectionConfig[] = [
  {
    key: "hero",
    id: "hero",
    pose: "welcome",
    concept: "default",
    tipKey: "journey.hero.tip",
    stepKey: "journey.hero.step",
  },
  {
    key: "border",
    id: "border",
    pose: "point",
    concept: "border",
    tipKey: "journey.border.tip",
    stepKey: "journey.border.step",
  },
  {
    key: "people",
    id: "people",
    pose: "peace",
    concept: "people",
    tipKey: "journey.people.tip",
    stepKey: "journey.people.step",
  },
  {
    key: "ecosystem",
    id: "ecosystem",
    pose: "globe",
    concept: "ecosystem",
    tipKey: "journey.ecosystem.tip",
    stepKey: "journey.ecosystem.step",
  },
  {
    key: "join",
    id: "join",
    pose: "peace",
    concept: "join",
    tipKey: "journey.join.tip",
    stepKey: "journey.join.step",
  },
];

function ecoSections(concept: MascotConcept): ConexaSectionConfig[] {
  const tip = `journey.${concept}.tip`;
  const step = `journey.${concept}.step`;
  return [
    {
      key: "eco-hero",
      selector: ".eco-hero",
      pose: "welcome",
      concept,
      tipKey: tip,
      stepKey: step,
    },
    {
      key: "eco-body",
      selector: ".eco-body",
      pose: "globe",
      concept,
      tipKey: `journey.${concept}.bodyTip`,
      stepKey: `journey.${concept}.bodyStep`,
    },
  ];
}

const ABOUT_FULL_SECTIONS: ConexaSectionConfig[] = [
  {
    key: "about-hero",
    selector: ".eco-hero--about-full",
    pose: "welcome",
    concept: "default",
    tipKey: "journey.about.tip",
    stepKey: "journey.about.step",
  },
  {
    key: "about-slide",
    selector: ".about-full-slide",
    pose: "think",
    concept: "innovacion",
    tipKey: "journey.about.slideTip",
    stepKey: "journey.about.slideStep",
  },
  {
    key: "about-info",
    id: "informacion",
    pose: "globe",
    concept: "default",
    tipKey: "journey.about.tip",
    stepKey: "journey.about.step",
  },
  {
    key: "about-stories",
    id: "historias",
    pose: "peace",
    concept: "people",
    tipKey: "journey.stories.tip",
    stepKey: "journey.stories.step",
  },
  {
    key: "about-join",
    id: "join",
    pose: "peace",
    concept: "join",
    tipKey: "journey.join.tip",
    stepKey: "journey.join.step",
  },
];

const DEFAULT_SECTIONS: ConexaSectionConfig[] = [
  {
    key: "main-hero",
    selector: "#hero, .eco-hero, main",
    pose: "welcome",
    concept: "default",
    tipKey: "journey.hero.tip",
    stepKey: "journey.hero.step",
  },
  {
    key: "main-body",
    selector: "#ecosystem, .eco-body, .areas-sec, #people",
    pose: "globe",
    concept: "ecosystem",
    tipKey: "journey.ecosystem.tip",
    stepKey: "journey.ecosystem.step",
  },
  {
    key: "main-join",
    selector: "#join, #border",
    pose: "peace",
    concept: "join",
    tipKey: "journey.join.tip",
    stepKey: "journey.join.step",
  },
];

export function getConexaSections(pathname: string): ConexaSectionConfig[] {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";

  if (path === "/") return CONEXA_HOME_SECTIONS;
  if (path === "/que-es") return ABOUT_FULL_SECTIONS;
  if (
    path === "/ecosistema" ||
    path.startsWith("/turismo") ||
    path.startsWith("/deporte") ||
    path.startsWith("/salud") ||
    path.startsWith("/educacion") ||
    path.startsWith("/comercios") ||
    path.startsWith("/eventos") ||
    path.startsWith("/descubrimiento") ||
    path.startsWith("/innovacion") ||
    path.startsWith("/solidaridad") ||
    path.startsWith("/bienestar") ||
    path.startsWith("/comunicacion")
  ) {
    return ecoSections(conceptFromPathname(pathname));
  }

  return DEFAULT_SECTIONS;
}

export type ConexaSectionTarget = {
  key: string;
  el: HTMLElement;
  pose: MascotPose;
  concept: MascotConcept;
  tipKey: string;
  stepKey: string;
};

export function resolveSectionTargets(configs: ConexaSectionConfig[]): ConexaSectionTarget[] {
  const seen = new Set<HTMLElement>();
  const targets: ConexaSectionTarget[] = [];

  for (const config of configs) {
    let node: HTMLElement | null = null;
    if (config.id) {
      node = document.getElementById(config.id);
    } else if (config.selector) {
      node = document.querySelector<HTMLElement>(config.selector);
    }
    if (node && !seen.has(node)) {
      seen.add(node);
      targets.push({
        key: config.key,
        el: node,
        pose: config.pose,
        concept: config.concept,
        tipKey: config.tipKey,
        stepKey: config.stepKey,
      });
    }
  }

  if (!targets.length) {
    const main = document.querySelector<HTMLElement>("main");
    if (main) {
      targets.push({
        key: "main",
        el: main,
        pose: "welcome",
        concept: "default",
        tipKey: "journey.hero.tip",
        stepKey: "journey.hero.step",
      });
    }
  }

  return targets;
}
