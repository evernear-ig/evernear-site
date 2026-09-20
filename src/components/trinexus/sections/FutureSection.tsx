import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T, THtml } from "@/components/trinexus/ui/T";

const BRANCHES = [
  { key: "fut.b1" },
  { key: "fut.b2" },
  { key: "fut.b3" },
  { key: "fut.b4" },
  { text: "Builders" },
  { key: "fut.b6" },
  { key: "fut.b7" },
  { text: "Startups" },
] as const;

const ROADMAP = [
  { tag: "tag.next", tagClass: "next", title: "TRINEXUS ID", body: "fut.id" },
  { tag: "tag.future", title: "TRINEXUS QR", body: "fut.qr" },
  { tag: "tag.future", title: "TRINEXUS MAP", body: "fut.map" },
  { tag: "tag.road", title: "TRINEXUS HUB", body: "fut.hub" },
  { tag: "tag.road", title: "TRINEXUS SUMMIT", body: "fut.summit" },
] as const;

export function FutureSection() {
  return (
    <section className="light future" id="future">
      <Seam />
      <div className="wrap">
        <Reveal className="grid g-7-5" style={{ alignItems: "end" }}>
          <h2 className="h-xl">
            <T k="fut.h" />
          </h2>
          <p className="lead">
            <T k="fut.lead" />
          </p>
        </Reveal>
        <Reveal className="orbit">
          <svg className="rings" viewBox="0 0 1100 1100" aria-hidden="true">
            <circle cx="550" cy="550" r="220" />
            <circle cx="550" cy="550" r="380" />
            <circle cx="550" cy="550" r="540" />
          </svg>
          <div className="eco">
            <div className="eco-center">TRINEXUS</div>
            <div className="eco-line" />
            <div className="eco-branches">
              {BRANCHES.map((branch, index) => (
                <div key={index}>
                  {"key" in branch && branch.key ? <T k={branch.key} /> : branch.text}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal className="roadmap">
          {ROADMAP.map((item) => (
            <div key={item.title} className="rm">
              <span className={`tag${"tagClass" in item && item.tagClass ? ` ${item.tagClass}` : ""}`}>
                <T k={item.tag} />
              </span>
              <h3>{item.title}</h3>
              <p>
                <T k={item.body} />
              </p>
            </div>
          ))}
        </Reveal>
        <Reveal className="qr">
          <div className="grid g-5-7" style={{ alignItems: "end" }}>
            <h3 className="h-xl" style={{ fontSize: "clamp(1.6rem,3.6vw,2.8rem)" }}>
              <THtml k="qr.h" />
            </h3>
            <p className="lead">
              <T k="qr.lead" />
            </p>
          </div>
          <div className="qr-diagram" aria-hidden="true">
            <div className="qr-side">
              <b>
                <T k="qr.phys" />
              </b>
              <ul>
                <li>
                  <T k="qr.p1" />
                </li>
                <li>
                  <T k="qr.p2" />
                </li>
                <li>
                  <T k="qr.p3" />
                </li>
                <li>
                  <T k="qr.p4" />
                </li>
              </ul>
            </div>
            <div className="qr-mid">
              <svg className="arr" viewBox="0 0 16 44" aria-hidden="true">
                <line x1="8" y1="4" x2="8" y2="40" />
                <path d="M3 9 L8 4 L13 9" />
                <path d="M3 35 L8 40 L13 35" />
              </svg>
              <div className="core">TRINEXUS QR</div>
              <svg className="arr" viewBox="0 0 16 44" aria-hidden="true">
                <line x1="8" y1="4" x2="8" y2="40" />
                <path d="M3 9 L8 4 L13 9" />
                <path d="M3 35 L8 40 L13 35" />
              </svg>
            </div>
            <div className="qr-side">
              <b>
                <T k="qr.dig" />
              </b>
              <ul>
                <li>TRINEXUS ID</li>
                <li>TRINEXUS MAP</li>
                <li>
                  <T k="qr.d3" />
                </li>
                <li>
                  <T k="qr.d4" />
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
