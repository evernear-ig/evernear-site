import Link from "next/link";
import { EcosystemLayersPanel } from "@/components/ecosystem/EcosystemLayersPanel";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T } from "@/components/trinexus/ui/T";

const BRANCHES = [
  { key: "fut.b1", href: "/ecosistema" },
  { key: "fut.b2", href: "/descubrimiento" },
  { key: "fut.b3", href: "/educacion" },
  { key: "fut.b4", href: "/eventos" },
  { text: "Builders", href: "/eventos" },
  { key: "fut.b6", href: "/descubrimiento?tab=opportunities" },
  { key: "fut.b7", href: "/comercios" },
  { text: "Startups", href: "/descubrimiento?tab=opportunities" },
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
            <Link href="/ecosistema" className="eco-center">
              TRINEXUS
            </Link>
            <div className="eco-line" />
            <div className="eco-branches">
              {BRANCHES.map((branch, index) => (
                <Link key={index} href={branch.href} className="eco-branch">
                  {"key" in branch && branch.key ? <T k={branch.key} /> : branch.text}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <EcosystemLayersPanel />
        </Reveal>
      </div>
    </section>
  );
}
