import Link from "next/link";
import { EcosystemLayersPanel } from "@/components/ecosystem/EcosystemLayersPanel";
import { Reveal } from "@/components/evernear/ui/Reveal";
import { Seam } from "@/components/evernear/ui/Seam";
import { T } from "@/components/evernear/ui/T";

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
        <Reveal>
          <EcosystemLayersPanel compact />
        </Reveal>
        <Reveal className="future-more">
          <Link href="/ecosistema" className="btn btn-outline-ink btn-sm">
            <T k="cta.explore" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
