"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PulsoSemanalContent } from "@/components/ecosystem/PulsoSemanalContent";

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
    <PulsoSemanalContent
      initialVertical={searchParams.get("vertical") ?? "all"}
      initialCity={searchParams.get("city") ?? "all"}
      initialCategory={searchParams.get("category") ?? "all"}
      initialWeek={searchParams.get("week") ?? undefined}
      onFiltersChange={onFiltersChange}
    />
  );
}
