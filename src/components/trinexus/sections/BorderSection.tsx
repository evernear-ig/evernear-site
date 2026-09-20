"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
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

export function BorderSection() {
  const { t } = useI18n();
  const mapRef = useRef<SVGSVGElement>(null);
  const [activeCity, setActiveCity] = useState<CityId | null>(null);
  const [stickyCity, setStickyCity] = useState<CityId | null>(null);

  const displayCity = activeCity ?? stickyCity;
  const photoKey = displayCity ?? "all";

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
      <Seam />
      <div className="wrap border-grid">
        <Reveal className="stack b-text">
          <h2 className="h-xl">
            <THtml k="border.h" />
          </h2>
          <p className="lead dim">
            <T k="border.lead" />
          </p>
          <p>
            <T k="border.p1" />
          </p>
          <p>
            <T k="border.p2" />
          </p>
        </Reveal>
        <Reveal delay={1} className="b-map">
          <svg
            ref={mapRef}
            className="border-map"
            id="borderMap"
            viewBox="0 0 560 520"
            role="img"
            aria-label={String(t("a11y.map"))}
            onMouseLeave={handleMapLeave}
          >
            <defs>
              <clipPath id="c">
                <rect width="560" height="520" />
              </clipPath>
            </defs>
            <g clipPath="url(#c)">
              <path className="topo" d="M0 60 C 120 40 200 90 300 70 S 480 40 560 60" />
              <path className="topo" d="M0 110 C 120 90 200 140 300 120 S 480 90 560 110" />
              <path className="topo" d="M0 160 C 100 140 180 190 260 170" />
              <path className="topo" d="M320 180 C 400 160 480 210 560 190" />
              <path className="topo" d="M0 470 C 100 450 200 500 300 480 S 480 450 560 470" />
              <path className="topo" d="M0 500 C 100 480 200 530 300 510 S 480 480 560 500" />
              <path
                className="fill py"
                d="M0 0 H300 C280 60 250 120 250 200 C250 240 240 270 235 320 C230 350 240 380 260 400 L0 400 Z"
              />
              <path
                className="fill br"
                d="M300 0 H560 V330 L400 330 C380 340 320 300 290 300 C270 280 265 240 265 200 C265 120 285 60 300 0 Z"
              />
              <path
                className="fill ar"
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
              <text className="lbl" x="70" y="120">
                PARAGUAY
              </text>
              <text className="lbl" x="400" y="80">
                {String(t("c.br.up"))}
              </text>
              <text className="lbl" x="70" y="470">
                ARGENTINA
              </text>
              <line
                className={`link${displayCity === "cde" ? " on" : ""}`}
                data-city="cde"
                x1="175"
                y1="255"
                x2="262"
                y2="322"
              />
              <line
                className={`link${displayCity === "foz" ? " on" : ""}`}
                data-city="foz"
                x1="360"
                y1="240"
                x2="262"
                y2="322"
              />
              <line
                className={`link${displayCity === "pi" ? " on" : ""}`}
                data-city="pi"
                x1="215"
                y1="395"
                x2="262"
                y2="322"
              />
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
                  <circle className="cp" cx={city === "cde" ? 175 : city === "foz" ? 360 : 215} cy={city === "pi" ? 395 : city === "foz" ? 240 : 255} r="4" style={index ? { animationDelay: `${index * 1.2}s` } : undefined} />
                  <circle className="dot" cx={city === "cde" ? 175 : city === "foz" ? 360 : 215} cy={city === "pi" ? 395 : city === "foz" ? 240 : 255} r="4" />
                  <text x={city === "cde" ? 70 : city === "foz" ? 372 : 130} y={city === "pi" ? 416 : 243}>
                    {city === "cde"
                      ? "Ciudad del Este"
                      : city === "foz"
                        ? "Foz do Iguaçu"
                        : "Puerto Iguazú"}
                  </text>
                </g>
              ))}
              <circle className="hub-ring" cx="262" cy="322" r="18" />
              <circle className="hub-ring" cx="262" cy="322" r="32" style={{ opacity: 0.2 }} />
              <circle className="hub" cx="262" cy="322" r="7" />
              <text
                className="lbl"
                x="262"
                y="370"
                textAnchor="middle"
                style={{ fill: "#2EE59D" }}
              >
                TRINEXUS
              </text>
            </g>
          </svg>
        </Reveal>
        <Reveal delay={2} className="b-info">
          <div className="city-panel">
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
            <div className="city-photo" style={{ marginTop: "14px" }}>
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
              </div>
              <div className="lab" id="cityInfo" aria-live="polite">
                {renderCityInfo()}
              </div>
            </div>
          </div>
          <div className="facts">
            <div>
              <strong>3</strong>
              <span>
                <T k="border.f1" />
              </span>
            </div>
            <div>
              <strong>3</strong>
              <span>
                <T k="border.f2" />
              </span>
            </div>
            <div>
              <strong>2</strong>
              <span>
                <T k="border.f3" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
