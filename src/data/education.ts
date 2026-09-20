import type { Course } from "@/lib/ecosystem/types";

export const COURSES: Course[] = [
  {
    slug: "bootcamp-dev-misiones",
    title: "Bootcamp de Desarrollo Web",
    institution: "Hub de Innovación Misiones",
    country: "ar",
    cityId: "pi",
    modality: "presencial",
    type: "curso",
    description:
      "Formación intensiva en desarrollo web para residentes de la región. Modalidad presencial con proyectos reales.",
  },
  {
    slug: "unila-intercambio",
    title: "Programa de Intercambio UNILA",
    institution: "Universidad Federal de Integración Latino-Americana",
    country: "br",
    cityId: "foz",
    modality: "presencial",
    type: "programa",
    description:
      "Programa académico trinacional en Foz do Iguaçu. Conecta estudiantes de Argentina, Brasil y Paraguay.",
  },
  {
    slug: "becas-triple-frontera",
    title: "Becas Triple Frontera",
    institution: "TRINEXUS + Aliados",
    country: "ar",
    cityId: "pi",
    modality: "hibrido",
    type: "beca",
    description:
      "Becas para formación en tecnología, emprendimiento e innovación en la región trifronteriza.",
  },
  {
    slug: "ingles-frontera",
    title: "Inglés para el Comercio Fronterizo",
    institution: "Instituto Regional CDE",
    country: "py",
    cityId: "cde",
    modality: "presencial",
    type: "curso",
    description:
      "Curso de inglés orientado al comercio y turismo en Ciudad del Este.",
  },
  {
    slug: "emprendimiento-online",
    title: "Emprendimiento Digital",
    institution: "TRINEXUS",
    country: "ar",
    cityId: "pi",
    modality: "online",
    type: "curso",
    description:
      "Curso online para fundadores y emprendedores de la Triple Frontera.",
  },
  {
    slug: "robotica-foz",
    title: "Introducción a la Robótica",
    institution: "SENAI Foz",
    country: "br",
    cityId: "foz",
    modality: "presencial",
    type: "curso",
    description: "Taller introductorio de robótica y automatización en Foz do Iguaçu.",
  },
];
