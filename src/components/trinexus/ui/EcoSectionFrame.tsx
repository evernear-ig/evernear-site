import type { ReactNode } from "react";
import { Seam } from "@/components/trinexus/ui/Seam";

type EcoSectionFrameProps = {
  embedded?: boolean;
  className?: string;
  id?: string;
  children: ReactNode;
};

export function EcoSectionFrame({
  embedded,
  className,
  id,
  children,
}: EcoSectionFrameProps) {
  if (embedded) {
    return (
      <div className={["eco-narrative", className].filter(Boolean).join(" ")}>
        <div className="wrap">{children}</div>
      </div>
    );
  }

  return (
    <section className={className} id={id}>
      <Seam />
      <div className="wrap">{children}</div>
    </section>
  );
}
