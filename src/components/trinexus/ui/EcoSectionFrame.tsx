import type { ReactNode } from "react";
import { Seam } from "@/components/trinexus/ui/Seam";

type EcoSectionFrameProps = {
  embedded?: boolean;
  className?: string;
  id?: string;
  /** Decorative layer rendered behind the content, full-bleed. */
  backdrop?: ReactNode;
  children: ReactNode;
};

export function EcoSectionFrame({
  embedded,
  className,
  id,
  backdrop,
  children,
}: EcoSectionFrameProps) {
  if (embedded) {
    return (
      <div
        id={id}
        className={["eco-narrative", className, backdrop ? "sec3d" : null]
          .filter(Boolean)
          .join(" ")}
      >
        {backdrop}
        <div className="wrap">{children}</div>
      </div>
    );
  }

  return (
    <section className={[className, backdrop ? "sec3d" : null].filter(Boolean).join(" ")} id={id}>
      <Seam />
      {backdrop}
      <div className="wrap">{children}</div>
    </section>
  );
}
