"use client";

import Image from "next/image";
import { MASCOT_POSE_SRC, type MascotPose } from "@/lib/mascot-poses";

type ConexaMascotFallbackProps = {
  pose: MascotPose;
  className?: string;
  alt?: string;
};

export function ConexaMascotFallback({
  pose,
  className = "",
  alt = "",
}: ConexaMascotFallbackProps) {
  return (
    <Image
      src={MASCOT_POSE_SRC[pose]}
      alt={alt || "CONEXA"}
      width={200}
      height={240}
      className={`conexa-mascot-fallback${className ? ` ${className}` : ""}`}
      aria-hidden={alt ? undefined : true}
    />
  );
}
