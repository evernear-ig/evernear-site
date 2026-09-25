"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PulsoSemanalContent } from "@/components/ecosystem/PulsoSemanalContent";
import { T } from "@/components/trinexus/ui/T";

export function PulsoPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onFiltersChange = useCallback(
    (filters: Record<string, string>) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") params.set(key, value);
      });
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  return (
    <>
      <section className="dark historias-hero historias-hero--compact">
        <div className="wrap historias-hero__copy">
          <h1 className="h-xl">
            <T k="nav.pulso" />
          </h1>
          <p className="lead">
            <T k="pulso.subscribe.lead" />
          </p>
        </div>
      </section>
      <section className="light historias-body">
        <div className="wrap">
          <PulsoSemanalContent
            initialVertical={searchParams.get("vertical") ?? "all"}
            initialCity={searchParams.get("city") ?? "all"}
            initialCategory={searchParams.get("category") ?? "all"}
            initialWeek={searchParams.get("week") ?? undefined}
            onFiltersChange={onFiltersChange}
          />
        </div>
      </section>
    </>
  );
}
