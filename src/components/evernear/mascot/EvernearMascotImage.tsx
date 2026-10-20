"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { CSSProperties } from "react";
import { MASCOT_POSE_SRC } from "@/lib/mascot-poses";
import type { MascotPose } from "@/lib/mascot-poses";

type EvernearMascotImageProps = {
  pose: MascotPose;
  prevPose?: MascotPose;
  assemble: number;
  compact?: boolean;
  alt?: string;
  className?: string;
};

export function EvernearMascotImage({
  pose,
  prevPose,
  assemble,
  compact = false,
  alt = "Evernear",
  className = "",
}: EvernearMascotImageProps) {
  const disperse = 1 - assemble;
  const showPrev = prevPose && prevPose !== pose && assemble < 0.92;

  const style = useMemo(
    () =>
      ({
        "--assemble": assemble,
        "--disperse": disperse,
      }) as CSSProperties,
    [assemble, disperse],
  );

  return (
    <div
      className={`evernear-mascot-img${compact ? " evernear-mascot-img--compact" : ""}${className ? ` ${className}` : ""}`}
      data-pose={pose}
      style={style}
    >
      {compact ? null : <div className="evernear-mascot-img__aura" aria-hidden="true" />}
      {showPrev ? (
        <Image
          src={MASCOT_POSE_SRC[prevPose]}
          alt=""
          width={400}
          height={480}
          aria-hidden
          className="evernear-mascot-img__photo evernear-mascot-img__photo--out"
          style={{ opacity: 1 - assemble }}
        />
      ) : null}
      {compact ? (
        <img
          src={MASCOT_POSE_SRC[pose]}
          alt={alt}
          width={400}
          height={480}
          className="evernear-mascot-img__photo"
          draggable={false}
        />
      ) : (
        <Image
          src={MASCOT_POSE_SRC[pose]}
          alt={alt}
          width={400}
          height={480}
          className="evernear-mascot-img__photo"
          priority={pose === "think"}
          style={{
            opacity: showPrev ? assemble : 0.88 + assemble * 0.12,
            transform: `scale(${0.9 + assemble * 0.1}) translateY(${disperse * 12}px)`,
          }}
        />
      )}
      {!compact ? (
        <>
          <div className="evernear-mascot-img__orbit-ring" aria-hidden="true" />
          <div
            className="evernear-mascot-img__orbit-ring evernear-mascot-img__orbit-ring--b"
            aria-hidden="true"
          />
        </>
      ) : null}
    </div>
  );
}
