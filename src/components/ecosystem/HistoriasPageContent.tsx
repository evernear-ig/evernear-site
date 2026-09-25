"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StoryReelsStrip } from "@/components/ecosystem/StoryReelsStrip";
import { StorySubmitForm } from "@/components/ecosystem/StorySubmitForm";
import { T } from "@/components/trinexus/ui/T";
import { CONNECTION_STORIES } from "@/data/stories";

type HistoriasPageContentProps = {
  asChapter?: boolean;
};

export function HistoriasPageContent({ asChapter = false }: HistoriasPageContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("tab") === "pulso") {
      router.replace("/pulso");
    }
  }, [router, searchParams]);

  const formOpen = searchParams.get("form") === "1";

  const setFormOpen = (next: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tab");
    if (next) params.set("form", "1");
    else params.delete("form");
    const qs = params.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(qs ? `${pathname}?${qs}${hash}` : `${pathname}${hash}`, {
      scroll: false,
    });
  };

  const Heading = asChapter ? "h2" : "h1";

  if (asChapter) {
    return (
      <section id="historias" className="light about-journey-chapter about-journey-chapter--stories">
        <div className="wrap">
          <header className="about-journey-chapter__head about-journey-chapter__head--stories">
            <Heading className="h-xl">
              <T k="stories.hero.h" />
            </Heading>
            <p className="lead">
              <T k="stories.hero.lead" />
            </p>
          </header>
          <StoryReelsStrip stories={CONNECTION_STORIES} />
          <StorySubmitForm defaultOpen={formOpen} onOpenChange={setFormOpen} />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="dark historias-hero historias-hero--compact">
        <div className="wrap historias-hero__copy">
          <Heading className="h-xl">
            <T k="stories.hero.h" />
          </Heading>
          <p className="lead">
            <T k="stories.hero.lead" />
          </p>
        </div>
      </section>

      <section className="light historias-body">
        <div className="wrap">
          <StoryReelsStrip stories={CONNECTION_STORIES} />
          <StorySubmitForm defaultOpen={formOpen} onOpenChange={setFormOpen} />
        </div>
      </section>
    </>
  );
}
