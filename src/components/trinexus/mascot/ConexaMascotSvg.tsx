"use client";

import type { CSSProperties } from "react";
import type { MascotConcept } from "@/lib/mascot-concepts";
import { MASCOT_CONCEPTS } from "@/lib/mascot-concepts";
import type { MascotPose } from "@/lib/mascot-poses";

type ConexaMascotSvgProps = {
  pose: MascotPose;
  concept: MascotConcept;
  assemble: number;
  className?: string;
};

function Accessory({ concept }: { concept: MascotConcept }) {
  switch (concept) {
    case "deporte":
      return (
        <g className="conexa-figure__accessory" data-layer="accessory">
          <circle cx="158" cy="118" r="11" fill="#FF6B4A" opacity="0.9" />
          <path d="M152 118h12M158 112v12" stroke="#FFD166" strokeWidth="1.5" />
        </g>
      );
    case "salud":
    case "bienestar":
      return (
        <g className="conexa-figure__accessory" data-layer="accessory">
          <path
            d="M100 128 C94 118 86 118 86 126 C86 134 100 142 100 142 C100 142 114 134 114 126 C114 118 106 118 100 128Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="conexa-figure__heart"
          />
        </g>
      );
    case "innovacion":
    case "educacion":
      return (
        <g className="conexa-figure__accessory" data-layer="accessory">
          <circle cx="88" cy="132" r="3" fill="#00D4FF" />
          <circle cx="100" cy="124" r="3" fill="#8A6DE6" />
          <circle cx="112" cy="132" r="3" fill="#2EE59D" />
          <path d="M88 132 L100 124 L112 132" stroke="#00D4FF" strokeWidth="1.2" fill="none" />
        </g>
      );
    case "solidaridad":
      return (
        <g className="conexa-figure__accessory" data-layer="accessory">
          <path d="M92 138 Q100 128 108 138" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="92" cy="138" r="4" fill="currentColor" />
          <circle cx="108" cy="138" r="4" fill="currentColor" />
        </g>
      );
    case "turismo":
      return (
        <g className="conexa-figure__accessory" data-layer="accessory">
          <path d="M100 118 L104 132 L96 132 Z" fill="#4ECDC4" />
          <circle cx="100" cy="118" r="3" fill="#FFD166" />
        </g>
      );
    case "comercios":
      return (
        <g className="conexa-figure__accessory" data-layer="accessory">
          <rect x="92" y="126" width="16" height="12" rx="2" fill="#FFD166" opacity="0.85" />
          <path d="M96 126 V122 Q100 118 104 122 V126" stroke="#FFD166" strokeWidth="1.5" fill="none" />
        </g>
      );
    case "ecosystem":
      return (
        <g className="conexa-figure__accessory" data-layer="accessory">
          <circle cx="100" cy="132" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
          <ellipse cx="100" cy="132" rx="14" ry="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <ellipse cx="100" cy="132" rx="6" ry="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </g>
      );
    case "border":
      return (
        <g className="conexa-figure__accessory" data-layer="accessory">
          <path d="M88 130 L100 118 L112 130 L100 142 Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </g>
      );
    default:
      return null;
  }
}

function Arms({ pose }: { pose: MascotPose }) {
  if (pose === "welcome") {
    return (
      <g className="conexa-figure__arms" data-layer="arms">
        <path d="M72 108 Q58 92 52 78" stroke="url(#conexa-arm-grad)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M128 108 Q142 92 148 78" stroke="url(#conexa-arm-grad)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <circle cx="52" cy="78" r="7" fill="#4B2FA6" />
        <circle cx="148" cy="78" r="7" fill="#4B2FA6" />
      </g>
    );
  }
  if (pose === "peace") {
    return (
      <g className="conexa-figure__arms" data-layer="arms">
        <path d="M74 112 Q64 124 62 138" stroke="url(#conexa-arm-grad)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M126 108 Q138 88 142 72" stroke="url(#conexa-arm-grad)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M138 66 L142 72 L148 68" stroke="#F6F7FB" strokeWidth="2" fill="none" />
        <path d="M138 78 L142 72 L148 76" stroke="#F6F7FB" strokeWidth="2" fill="none" />
        <circle cx="62" cy="138" r="6" fill="#4B2FA6" />
      </g>
    );
  }
  if (pose === "point") {
    return (
      <g className="conexa-figure__arms" data-layer="arms">
        <path d="M74 112 Q66 126 64 140" stroke="url(#conexa-arm-grad)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M126 110 Q148 104 162 98" stroke="url(#conexa-arm-grad)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="64" cy="140" r="6" fill="#4B2FA6" />
        <circle cx="162" cy="98" r="6" fill="#4B2FA6" />
      </g>
    );
  }
  if (pose === "think") {
    return (
      <g className="conexa-figure__arms" data-layer="arms">
        <path d="M74 112 Q66 126 64 140" stroke="url(#conexa-arm-grad)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M126 112 Q118 100 112 92" stroke="url(#conexa-arm-grad)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="64" cy="140" r="6" fill="#4B2FA6" />
        <circle cx="112" cy="92" r="6" fill="#4B2FA6" />
      </g>
    );
  }
  return (
    <g className="conexa-figure__arms" data-layer="arms">
      <path d="M76 114 Q68 128 66 142" stroke="url(#conexa-arm-grad)" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M124 114 Q132 128 134 142" stroke="url(#conexa-arm-grad)" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="148" r="16" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
      <circle cx="100" cy="148" r="10" fill="rgba(46,229,157,0.15)" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="66" cy="142" r="6" fill="#4B2FA6" />
      <circle cx="134" cy="142" r="6" fill="#4B2FA6" />
    </g>
  );
}

export function ConexaMascotSvg({
  pose,
  concept,
  assemble,
  className = "",
}: ConexaMascotSvgProps) {
  const tokens = MASCOT_CONCEPTS[concept];
  const disperse = 1 - assemble;

  return (
    <svg
      className={`conexa-figure${className ? ` ${className}` : ""}`}
      viewBox="0 0 200 240"
      role="img"
      aria-label="CONEXA"
      style={
        {
          "--assemble": assemble,
          "--disperse": disperse,
          "--conexa-accent": tokens.accent,
          "--conexa-accent-soft": tokens.accentSoft,
          "--conexa-node-a": tokens.nodeA,
          "--conexa-node-b": tokens.nodeB,
          color: tokens.accent,
        } as CSSProperties
      }
      data-pose={pose}
      data-concept={concept}
      data-assemble={assemble > 0.92 ? "1" : assemble < 0.08 ? "0" : "mid"}
    >
      <defs>
        <linearGradient id="conexa-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4B2FA6" />
          <stop offset="55%" stopColor="#2E1A6E" />
          <stop offset="100%" stopColor="#141B3D" />
        </linearGradient>
        <linearGradient id="conexa-arm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6A4BC6" />
          <stop offset="100%" stopColor="#2E1A6E" />
        </linearGradient>
        <radialGradient id="conexa-core-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F6F7FB" />
          <stop offset="45%" stopColor={tokens.accent} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="conexa-fig-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="conexa-figure__rings" data-layer="rings" filter="url(#conexa-fig-glow)">
        <ellipse cx="100" cy="108" rx="62" ry="22" fill="none" stroke={tokens.accentSoft} strokeWidth="1.4" opacity="0.55" transform="rotate(-18 100 108)" />
        <ellipse cx="100" cy="112" rx="54" ry="18" fill="none" stroke={tokens.accent} strokeWidth="1.2" opacity="0.7" transform="rotate(24 100 112)" />
        <ellipse cx="100" cy="116" rx="46" ry="14" fill="none" stroke={tokens.nodeB} strokeWidth="1" opacity="0.5" transform="rotate(62 100 116)" />
        <circle cx="44" cy="100" r="4.5" fill={tokens.nodeA} />
        <circle cx="156" cy="104" r="4" fill={tokens.nodeB} />
        <circle cx="72" cy="132" r="3.5" fill={tokens.accent} />
        <circle cx="128" cy="88" r="3.5" fill={tokens.nodeB} />
      </g>

      <g className="conexa-figure__ribbons" data-layer="ribbons">
        <path d="M88 156 Q100 170 112 156 Q118 178 100 196 Q82 178 88 156" fill="none" stroke={tokens.accent} strokeWidth="3" opacity="0.35" />
        <path d="M92 160 Q100 172 108 160" fill="none" stroke={tokens.accentSoft} strokeWidth="2" opacity="0.45" />
      </g>

      <g className="conexa-figure__body" data-layer="body">
        <path
          d="M100 52 C72 52 58 78 58 108 C58 142 74 178 100 214 C126 178 142 142 142 108 C142 78 128 52 100 52Z"
          fill="url(#conexa-body-grad)"
        />
        <path
          d="M100 214 C88 196 78 170 74 148 C72 136 72 124 76 112 C84 96 100 88 100 88 C100 88 116 96 124 112 C128 124 128 136 126 148 C122 170 112 196 100 214Z"
          fill="#1A1248"
          opacity="0.35"
        />
      </g>

      <g className="conexa-figure__core" data-layer="core">
        <circle cx="100" cy="132" r="12" fill="url(#conexa-core-grad)" filter="url(#conexa-fig-glow)" />
        {tokens.pulse ? (
          <circle cx="100" cy="132" r="18" fill="none" stroke={tokens.accent} strokeWidth="1" className="conexa-figure__pulse" />
        ) : null}
      </g>

      <Arms pose={pose} />

      <g className="conexa-figure__head" data-layer="head">
        <path
          d="M100 44 C78 44 66 58 66 76 C66 94 80 108 100 112 C120 108 134 94 134 76 C134 58 122 44 100 44Z"
          fill="#3D2A8C"
        />
        <path d="M100 36 L106 48 L94 48 Z" fill={tokens.accent} />
        <rect x="74" y="64" width="52" height="34" rx="16" fill="#0B0F24" />
        <path d="M84 78 Q88 72 92 78" stroke="#F6F7FB" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M108 78 Q112 72 116 78" stroke="#F6F7FB" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M92 90 Q100 96 108 90" stroke={tokens.accentSoft} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      <Accessory concept={concept} />
    </svg>
  );
}
