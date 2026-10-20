import { T } from "@/components/evernear/ui/T";

type ItemIconName = "search" | "hands" | "link" | "beam" | "rocket" | "megaphone";

type CardItem = {
  icon: ItemIconName;
  labelKey: string;
  bodyKey: string;
};

const CARDS: {
  titleKey: string;
  bars: number[];
  items: [CardItem, CardItem];
  mark: "map" | "handshake" | "target";
}[] = [
  {
    titleKey: "about.show.is",
    bars: [12, 22, 9, 28, 16, 24, 11],
    mark: "map",
    items: [
      {
        icon: "search",
        labelKey: "about.show.is.1.k",
        bodyKey: "about.show.is.1.v",
      },
      {
        icon: "hands",
        labelKey: "about.show.is.2.k",
        bodyKey: "about.show.is.2.v",
      },
    ],
  },
  {
    titleKey: "about.show.purpose",
    bars: [18, 10, 26, 14, 30, 12, 20],
    mark: "handshake",
    items: [
      {
        icon: "link",
        labelKey: "about.show.purpose.1.k",
        bodyKey: "about.show.purpose.1.v",
      },
      {
        icon: "beam",
        labelKey: "about.show.purpose.2.k",
        bodyKey: "about.show.purpose.2.v",
      },
    ],
  },
  {
    titleKey: "about.show.goal",
    bars: [8, 20, 14, 32, 11, 22, 16],
    mark: "target",
    items: [
      {
        icon: "rocket",
        labelKey: "about.show.goal.1.k",
        bodyKey: "about.show.goal.1.v",
      },
      {
        icon: "megaphone",
        labelKey: "about.show.goal.2.k",
        bodyKey: "about.show.goal.2.v",
      },
    ],
  },
];

function ItemIcon({ name }: { name: ItemIconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="M14.8 14.8 20 20" />
      </svg>
    );
  }
  if (name === "hands") {
    return (
      <svg {...common}>
        <path d="M4.5 12.5 8 9.2a1.7 1.7 0 0 1 2.4 2.4L8.2 14" />
        <path d="M8.2 14c.8 1.6 2.2 3.2 4.2 3.6 1.8.3 3.4-.4 4.6-1.8" />
        <path d="M19.5 11.5 16 8.2a1.7 1.7 0 0 0-2.4 2.4l2.2 2.4" />
        <path d="M10.2 12.2 13.8 9" />
      </svg>
    );
  }
  if (name === "link") {
    return (
      <svg {...common}>
        <path d="M10 13.5a4 4 0 0 0 5.7.4l2.2-2.2a4 4 0 0 0-5.6-5.7l-1.3 1.2" />
        <path d="M14 10.5a4 4 0 0 0-5.7-.4l-2.2 2.2a4 4 0 0 0 5.6 5.7l1.2-1.2" />
      </svg>
    );
  }
  if (name === "beam") {
    return (
      <svg {...common}>
        <path d="M9 15.5 14.5 4.5" />
        <path d="M8.2 16.8h5.2l-1.2 3.2H9.4z" />
        <path d="M5 8.5c1.6 1 2.4 1 4 0" />
        <path d="M4.2 11.2c2 1.1 3.2 1.1 5.2 0" />
      </svg>
    );
  }
  if (name === "rocket") {
    return (
      <svg {...common}>
        <path d="M12 19.5s5-2.2 5-8.2c0-4.2-2.2-7.8-5-9.3-2.8 1.5-5 5.1-5 9.3 0 6 5 8.2 5 8.2z" />
        <path d="M9.2 14.2 6.5 17.2" />
        <path d="M14.8 14.2 17.5 17.2" />
        <circle cx="12" cy="10" r="1.4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M5 9.5v5l8 2.2V7.3L5 9.5z" />
      <path d="M13 8.2c2.2.6 3.6 2 3.6 3.8S15.2 15.2 13 15.8" />
      <path d="M16.8 6.5c2.4 1.3 3.7 3.4 3.7 5.5s-1.3 4.2-3.7 5.5" />
      <path d="M7.5 15.2 6.8 19" />
    </svg>
  );
}

function Bars({ heights }: { heights: number[] }) {
  return (
    <svg className="qes-bars" viewBox="0 0 92 36" aria-hidden="true">
      {heights.map((height, index) => (
        <rect
          key={index}
          x={index * 13}
          y={36 - height}
          width="7"
          height={height}
          rx="1.4"
          opacity={0.42 + (index % 4) * 0.14}
        />
      ))}
    </svg>
  );
}

function FloatMark({ kind }: { kind: "map" | "handshake" | "target" }) {
  if (kind === "map") {
    return (
      <svg className="qes-mark" viewBox="0 0 128 112" aria-hidden="true">
        <defs>
          <linearGradient id="qesMapPaper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d7f6ff" />
            <stop offset="42%" stopColor="#3ec4ef" />
            <stop offset="100%" stopColor="#1767b8" />
          </linearGradient>
          <linearGradient id="qesScope" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4fbff" />
            <stop offset="100%" stopColor="#7aa4c8" />
          </linearGradient>
          <filter id="qesMarkShadow" x="-30%" y="-20%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="4" floodColor="#021018" floodOpacity="0.55" />
          </filter>
        </defs>
        <g transform="translate(6 10) rotate(-24 22 16)">
          <rect x="0" y="8" width="34" height="9" rx="4.5" fill="url(#qesScope)" />
          <rect x="26" y="5.5" width="16" height="14" rx="3" fill="#9ec4de" />
          <circle cx="46" cy="12.5" r="7" fill="#1b2838" stroke="#e7f4ff" strokeWidth="2" />
          <path d="M8 22.5 4 34" stroke="#8eb0cc" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <g filter="url(#qesMarkShadow)" transform="translate(30 24)">
          <path d="M6 12 40 4l38 12v52L40 78 6 66Z" fill="url(#qesMapPaper)" />
          <path d="M40 4v74" stroke="rgba(255,255,255,.55)" strokeWidth="1.2" />
          <path d="M40 4 78 16v52L40 78Z" fill="rgba(4,24,48,.2)" />
          <path
            d="M16 22h16M16 34h16M16 46h16M50 26h16M50 38h16M50 50h16"
            stroke="rgba(255,255,255,.55)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M56 22c-4.2 0-7.6 3.4-7.6 7.6 0 5.6 7.6 13.2 7.6 13.2s7.6-7.6 7.6-13.2c0-4.2-3.4-7.6-7.6-7.6z"
            fill="#ff4d62"
          />
          <circle cx="56" cy="29.4" r="2.6" fill="#fff" />
        </g>
      </svg>
    );
  }

  if (kind === "handshake") {
    return (
      <svg className="qes-mark" viewBox="0 0 128 104" aria-hidden="true">
        <defs>
          <linearGradient id="qesHandL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e7f7ff" />
            <stop offset="40%" stopColor="#6ec8f5" />
            <stop offset="100%" stopColor="#1d6eae" />
          </linearGradient>
          <linearGradient id="qesHandR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b9e4ff" />
            <stop offset="100%" stopColor="#184f86" />
          </linearGradient>
          <filter id="qesHandShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="4" floodColor="#021018" floodOpacity="0.5" />
          </filter>
        </defs>
        <g filter="url(#qesHandShadow)">
          <path d="M10 42h22l6 6v18H16c-6 0-10-4-10-10V46c0-2 2-4 4-4z" fill="#163f72" />
          <path d="M118 42H96l-6 6v18h22c6 0 10-4 10-10V46c0-2-2-4-4-4z" fill="#102f56" />
          <path d="M36 50c8-10 18-8 24 0l6 10c2 4-2 8-6 8H48c-8 0-14-6-12-18z" fill="url(#qesHandL)" />
          <path d="M92 50c-8-10-18-8-24 0l-6 10c-2 4 2 8 6 8h12c8 0 14-6 12-18z" fill="url(#qesHandR)" />
          <path d="M48 58h32" stroke="#f4fbff" strokeWidth="3" strokeLinecap="round" />
          <path d="M58 52c4 6 8 6 12 0" fill="none" stroke="#163f72" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  return (
    <svg className="qes-mark" viewBox="0 0 128 116" aria-hidden="true">
      <defs>
        <radialGradient id="qesCore" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#fff6d2" />
          <stop offset="55%" stopColor="#f2c14a" />
          <stop offset="100%" stopColor="#c98412" />
        </radialGradient>
        <linearGradient id="qesArrow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff1c2" />
          <stop offset="100%" stopColor="#e39b16" />
        </linearGradient>
        <filter id="qesTargetShadow" x="-25%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="4" floodColor="#021018" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#qesTargetShadow)">
        <circle cx="58" cy="66" r="40" fill="none" stroke="#ff4f9a" strokeWidth="8" />
        <circle cx="58" cy="66" r="26" fill="none" stroke="#7a4bff" strokeWidth="8" />
        <circle cx="58" cy="66" r="13" fill="url(#qesCore)" />
        <g transform="rotate(36 96 28)">
          <rect x="34" y="24" width="58" height="7" rx="3.5" fill="url(#qesArrow)" />
          <polygon points="86,16 110,27.5 86,39" fill="#ffe7ad" />
        </g>
      </g>
    </svg>
  );
}

export function QueEsHero() {
  return (
    <section className="hero hero--cinema qes-hero" id="que-es" aria-labelledby="que-es-title">
      <div className="wrap">
        <div className="hero-content">
          <h1 className="h-display" id="que-es-title">
            <T k="about.page.h" />
          </h1>
          <p className="lead">
            <T k="about.show.lead" />
          </p>
        </div>
        <div className="qes-grid" id="que-es-cards">
          {CARDS.map((card) => (
            <article key={card.titleKey} className="qes-card">
              <div className="qes-float">
                <FloatMark kind={card.mark} />
              </div>
              <h3 className="qes-card-title">
                <T k={card.titleKey} />
              </h3>
              <ul className="qes-items">
                {card.items.map((item) => (
                  <li key={item.labelKey} className="qes-item">
                    <span className="qes-item-icon">
                      <ItemIcon name={item.icon} />
                    </span>
                    <p>
                      <strong>
                        <T k={item.labelKey} />
                        {": "}
                      </strong>
                      <T k={item.bodyKey} />
                    </p>
                  </li>
                ))}
              </ul>
              <Bars heights={card.bars} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
