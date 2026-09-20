import type { Business } from "@/lib/ecosystem/types";

export const BUSINESSES: Business[] = [
  {
    slug: "verduleria-san-ignacio",
    name: "Verdulería San Ignacio",
    category: "Alimentos",
    cityId: "pi",
    promo: "10% off en frutas de estación para clientes frecuentes",
    promoUntil: "2026-04-30",
    hours: "Lun–Sáb 7:00–20:00",
    description:
      "Verdulería de barrio en Puerto Iguazú con productos frescos de la región. Más de 15 años atendiendo a la comunidad.",
    qrId: "biz-verduleria-si",
    panfletoSubscribed: true,
  },
  {
    slug: "cafe-frontera",
    name: "Café Frontera",
    category: "Gastronomía",
    cityId: "foz",
    promo: "Café + medialuna a precio especial los martes",
    promoUntil: "2026-05-31",
    hours: "Todos los días 7:00–22:00",
    description:
      "Café con vista al río en Foz do Iguaçu. Punto de encuentro para nómadas digitales y viajeros.",
    qrId: "biz-cafe-frontera",
    panfletoSubscribed: true,
  },
  {
    slug: "electronica-del-este",
    name: "Electrónica del Este",
    category: "Electrónica",
    cityId: "cde",
    promo: "15% en accesorios de celular esta semana",
    promoUntil: "2026-04-15",
    hours: "Lun–Sáb 9:00–21:00",
    description:
      "Comercio de electrónica en Ciudad del Este con atención personalizada y garantía local.",
    qrId: "biz-electronica-cde",
    panfletoSubscribed: true,
  },
  {
    slug: "artesanias-misioneras",
    name: "Artesanías Misioneras",
    category: "Artesanías",
    cityId: "pi",
    promo: "Envío gratis en compras mayores a $15.000",
    promoUntil: "2026-06-01",
    hours: "Mar–Dom 10:00–19:00",
    description:
      "Artesanías regionales hechas por productores locales de Misiones. Cada pieza cuenta una historia.",
    qrId: "biz-artesanias",
    panfletoSubscribed: false,
  },
  {
    slug: "ferreteria-triple",
    name: "Ferretería Triple",
    category: "Herramientas",
    cityId: "foz",
    promo: "20% en herramientas seleccionadas",
    promoUntil: "2026-04-20",
    hours: "Lun–Vie 8:00–18:00, Sáb 8:00–13:00",
    description:
      "Ferretería familiar en Foz atendiendo obras y hogares de la región trifronteriza.",
    qrId: "biz-ferreteria-triple",
    panfletoSubscribed: true,
  },
];
