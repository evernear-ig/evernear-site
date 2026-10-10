export type CityId = "pi" | "foz" | "cde";

export const CITIES: Record<
  CityId,
  { id: CityId; nameKey: string; countryKey: string }
> = {
  pi: { id: "pi", nameKey: "city.pi", countryKey: "country.ar" },
  foz: { id: "foz", nameKey: "city.foz", countryKey: "country.br" },
  cde: { id: "cde", nameKey: "city.cde", countryKey: "country.py" },
};

export const CITY_LIST = Object.values(CITIES);
