"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T, THtml } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

type CityId = "pi" | "foz" | "cde";
type CityTab = "all" | CityId;

const CITY_TABS: { id: CityTab; label?: string; labelKey?: string }[] = [
  { id: "all", labelKey: "ct.all" },
  { id: "pi", label: "Puerto Iguazú" },
  { id: "foz", label: "Foz do Iguaçu" },
  { id: "cde", label: "Ciudad del Este" },
];

const CITY_ARIA: Record<CityId, string> = {
  cde: "Ciudad del Este, Paraguay",
  foz: "Foz do Iguaçu, Brasil",
  pi: "Puerto Iguazú, Argentina",
};

const CITY_POS: Record<CityId, { cx: number; cy: number }> = {
  cde: { cx: 175, cy: 255 },
  foz: { cx: 360, cy: 240 },
  pi: { cx: 375, cy: 388 },
};

const MAP_FRAME = "scale(1.536 0.741)";

export function BorderSection() {
  const { t } = useI18n();
  const mapRef = useRef<SVGSVGElement>(null);
  const [activeCity, setActiveCity] = useState<CityId | null>(null);
  const [stickyCity, setStickyCity] = useState<CityId | null>(null);

  const displayCity = activeCity ?? stickyCity;
  const photoKey = displayCity ?? "all";
  const activeCountry =
    displayCity === "pi" ? "ar" : displayCity === "foz" ? "br" : displayCity === "cde" ? "py" : null;

  const renderCityInfo = useCallback(() => {
    const subj = String(t(`ph.${photoKey}`));
    const note = (
      <small className="ph-meta">
        {subj} · <T k="ph.placeholder" />
      </small>
    );

    if (!displayCity) {
      return (
        <>
          <b>
            <T k="border.hint.b" />
          </b>
          <span>
            <T k="border.hint" />
          </span>
          {note}
        </>
      );
    }

    return (
      <>
        <b>{String(t(`city.${displayCity}.b`))}</b>
        <span>{String(t(`city.${displayCity}`))}</span>
        {note}
      </>
    );
  }, [displayCity, photoKey, t]);

  const setCity = (id: CityId | null, sticky?: boolean) => {
    if (sticky !== undefined) setStickyCity(sticky ? id : null);
    setActiveCity(id);
  };

  const handleMapLeave = () => {
    if (
      document.activeElement instanceof SVGElement &&
      document.activeElement.classList.contains("city")
    ) {
      return;
    }
    setActiveCity(stickyCity);
  };

  return (
    <section className="dark" id="border">
      <div className="wrap border-grid">
        <div className="border-left">
          <Reveal className="b-title">
            <h2 className="h-xl">
              <THtml k="border.h" />
            </h2>
          </Reveal>
          <Reveal className="stack b-body">
            <p className="lead">
              <T k="border.lead" />
            </p>
            <p>
              <T k="border.p1" />
            </p>
          </Reveal>
        </div>
        <div className="border-right">
          <div className="b-map-wrap">
            <div className="b-map-legend" aria-hidden="true">
              <span className="b-map-lbl b-map-lbl-py">PARAGUAY</span>
              <span className="b-map-lbl b-map-lbl-br">{String(t("c.br.up"))}</span>
              <span className="b-map-lbl b-map-lbl-ar">ARGENTINA</span>
              <span className={`b-map-city b-map-city-cde${displayCity === "cde" ? " on" : ""}`}>
                Ciudad del Este
              </span>
              <span className={`b-map-city b-map-city-foz${displayCity === "foz" ? " on" : ""}`}>
                Foz do Iguaçu
              </span>
              <span className={`b-map-city b-map-city-pi${displayCity === "pi" ? " on" : ""}`}>
                Puerto Iguazú
              </span>
              <span className="b-map-hub">CONEXA</span>
            </div>
            <svg
              ref={mapRef}
              className={`border-map${activeCountry ? ` on-${activeCountry}` : ""}`}
              id="borderMap"
              viewBox="0 0 860 400"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label={String(t("a11y.map"))}
              onMouseLeave={handleMapLeave}
            >
            <defs>
              <clipPath id="c">
                <rect width="560" height="540" />
              </clipPath>
              <linearGradient id="grad-ar" gradientUnits="userSpaceOnUse" x1="0" y1="410" x2="0" y2="520">
                <stop offset="0%" stopColor="#74ACDF" stopOpacity="0.34" />
                <stop offset="46%" stopColor="#74ACDF" stopOpacity="0.34" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.16" />
                <stop offset="54%" stopColor="#74ACDF" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#74ACDF" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="grad-br" gradientUnits="userSpaceOnUse" x1="300" y1="0" x2="560" y2="330">
                <stop offset="0%" stopColor="#009C3B" stopOpacity="0.34" />
                <stop offset="62%" stopColor="#009C3B" stopOpacity="0.3" />
                <stop offset="88%" stopColor="#FFDF00" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#002776" stopOpacity="0.22" />
              </linearGradient>
              <linearGradient id="grad-py" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="400">
                <stop offset="0%" stopColor="#D52B1E" stopOpacity="0.32" />
                <stop offset="33%" stopColor="#D52B1E" stopOpacity="0.32" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.14" />
                <stop offset="67%" stopColor="#0038A8" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#0038A8" stopOpacity="0.28" />
              </linearGradient>
            </defs>
            <g className="border-map-art" transform={MAP_FRAME} clipPath="url(#c)">
              <path className="topo" d="M0 60 C 120 40 200 90 300 70 S 480 40 560 60" />
              <path className="topo" d="M0 110 C 120 90 200 140 300 120 S 480 90 560 110" />
              <path className="topo" d="M0 160 C 100 140 180 190 260 170" />
              <path className="topo" d="M320 180 C 400 160 480 210 560 190" />
              <path className="topo" d="M0 470 C 100 450 200 500 300 480 S 480 450 560 470" />
              <path className="topo" d="M0 500 C 100 480 200 530 300 510 S 480 480 560 500" />
              <path
                className="fill py"
                fill="url(#grad-py)"
                d="M0 0 H300 C280 60 250 120 250 200 C250 240 240 270 235 320 C230 350 240 380 260 400 L0 400 Z"
              />
              <path
                className="fill br"
                fill="url(#grad-br)"
                d="M300 0 H560 V330 L400 330 C380 340 320 300 290 300 C270 280 265 240 265 200 C265 120 285 60 300 0 Z"
              />
              <path
                className="fill ar"
                fill="url(#grad-ar)"
                d="M0 410 L260 410 C300 360 340 330 400 340 L560 340 V520 H0 Z"
              />
              <path
                className="river-glow"
                d="M300 0 C280 60 250 120 250 200 C250 240 240 270 235 320 C230 350 240 380 260 400 C275 425 290 440 300 520"
              />
              <path
                className="river"
                d="M300 0 C280 60 250 120 250 200 C250 240 240 270 235 320 C230 350 240 380 260 400 C275 425 290 440 300 520"
              />
              <path
                className="river-glow"
                d="M258 322 C300 300 340 330 400 336 C450 340 500 330 560 345"
              />
              <path
                className="river"
                d="M258 322 C300 300 340 330 400 336 C450 340 500 330 560 345"
              />
              {(["cde", "foz", "pi"] as const).map((city) => (
                <line
                  key={`link-${city}`}
                  className={`link${displayCity === city ? " on" : ""}`}
                  data-city={city}
                  x1={CITY_POS[city].cx}
                  y1={CITY_POS[city].cy}
                  x2="262"
                  y2="322"
                />
              ))}
              <circle className="mv m1" r="2.5" />
              <circle className="mv m2" r="2.5" />
              <circle className="mv m3" r="2.5" />
              <circle className="mv m4" r="2" />
              {(["cde", "foz", "pi"] as const).map((city, index) => (
                <g
                  key={city}
                  className={`city${displayCity === city ? " on" : ""}`}
                  data-city={city}
                  tabIndex={0}
                  role="button"
                  aria-label={CITY_ARIA[city]}
                  onMouseEnter={() => setCity(city)}
                  onFocus={() => setCity(city)}
                  onClick={() =>
                    setCity(stickyCity === city ? null : city, stickyCity !== city)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setCity(city);
                    }
                  }}
                >
                  <circle className="cp" cx={CITY_POS[city].cx} cy={CITY_POS[city].cy} r="4" style={index ? { animationDelay: `${index * 1.2}s` } : undefined} />
                  <circle className="dot" cx={CITY_POS[city].cx} cy={CITY_POS[city].cy} r="4" />
                </g>
              ))}
              <circle className="hub-ring" cx="262" cy="322" r="18" />
              <circle className="hub-ring" cx="262" cy="322" r="32" style={{ opacity: 0.2 }} />
              <circle className="hub" cx="262" cy="322" r="7" />
            </g>
            </svg>
          </div>
          <div className="city-panel border-city-panel">
            <div
              className="city-tabs"
              role="group"
              aria-label={String(t("a11y.citytabs"))}
            >
              {CITY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  data-city-tab={tab.id}
                  aria-pressed={photoKey === tab.id}
                  onClick={() => setCity(tab.id === "all" ? null : tab.id, true)}
                >
                  <i />
                  {tab.labelKey ? <T k={tab.labelKey} /> : tab.label}
                </button>
              ))}
            </div>
            <div className={`city-photo border-city-photo${displayCity ? ` is-${displayCity}` : " is-all"}`}>
              <div className="ph">
                {CITY_TABS.map((tab) => (
                  <TrinexusPhoto
                    key={tab.id}
                    asLayer
                    imageKey={`cities.${tab.id}`}
                    cityImg={tab.id}
                    show={photoKey === tab.id}
                  />
                ))}
                <div className="veil" />
                <div className="border-photo-shine" aria-hidden="true" />
              </div>
              <div className="lab" id="cityInfo" key={photoKey} aria-live="polite">
                {renderCityInfo()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
