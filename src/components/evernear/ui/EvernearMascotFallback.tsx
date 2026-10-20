"use client";

import Image from "next/image";
import { MASCOT_POSE_SRC, type MascotPose } from "@/lib/mascot-poses";

type EvernearMascotFallbackProps = {
  pose: MascotPose;
  className?: string;
  alt?: string;
};

export function EvernearMascotFallback({
  pose,
  className = "",
  alt = "",
}: EvernearMascotFallbackProps) {
  return (
    <Image
      src={MASCOT_POSE_SRC[pose]}
      alt={alt || "Evernear"}
      width={200}
      height={240}
      className={`evernear-mascot-fallback${className ? ` ${className}` : ""}`}
      aria-hidden={alt ? undefined : true}
    />
  );
}
