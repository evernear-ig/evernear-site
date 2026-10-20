export type MascotPose = "welcome" | "globe" | "peace" | "think" | "point";

export const MASCOT_POSE_SRC: Record<MascotPose, string> = {
  welcome: "/images/mascot/evernear-welcome.webp",
  globe: "/images/mascot/evernear-globe.webp",
  peace: "/images/mascot/evernear-peace.webp",
  think: "/images/mascot/evernear-thinker.png?v=3",
  point: "/images/mascot/evernear-point.webp",
};

/** @deprecated Use MASCOT_POSE_SRC */
export const MASCOT_SHEET = "/images/mascot/evernear-sheet.jpg";

export type MascotPoseUv = {
  offset: [number, number];
  repeat: [number, number];
};

/** @deprecated Legacy spritesheet UV */
export const MASCOT_POSE_UV: Record<MascotPose, MascotPoseUv> = {
  welcome: { offset: [0.08, 0.02], repeat: [0.84, 0.58] },
  globe: { offset: [0.02, 0.6], repeat: [0.22, 0.38] },
  peace: { offset: [0.26, 0.6], repeat: [0.22, 0.38] },
  think: { offset: [0.5, 0.6], repeat: [0.22, 0.38] },
  point: { offset: [0.74, 0.6], repeat: [0.22, 0.38] },
};

export function mascotPoseSrc(pose: MascotPose) {
  return MASCOT_POSE_SRC[pose];
}
