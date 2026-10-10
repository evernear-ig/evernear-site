"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RealStoriesSection } from "@/components/ecosystem/stories/RealStoriesSection";
import { StorySubmitForm } from "@/components/ecosystem/StorySubmitForm";

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

  return (
    <section
      id="historias"
      className={
        asChapter
          ? "dark about-journey-chapter about-journey-chapter--stories rs-chapter"
          : "dark rs-chapter rs-chapter--page"
      }
      aria-labelledby="historias-title"
    >
      <div className="wrap">
        <RealStoriesSection titleAs={asChapter ? "h2" : "h1"} onTellStory={() => setFormOpen(true)} />
        <StorySubmitForm hideTrigger defaultOpen={formOpen} onOpenChange={setFormOpen} />
      </div>
    </section>
  );
}
