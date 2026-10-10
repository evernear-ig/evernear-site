"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ConexaCompanionScene } from "@/components/trinexus/three/scenes/ConexaCompanionScene";
import type { MascotPose } from "@/lib/mascot-poses";

type ConexaCompanionCanvasProps = {
  sectionCount: number;
  activeIndex: number;
  pose: MascotPose;
  reducedMotion?: boolean;
  frameloop?: "always" | "demand";
};

export default function ConexaCompanionCanvas({
  sectionCount,
  activeIndex,
  pose,
  reducedMotion = false,
  frameloop = "always",
}: ConexaCompanionCanvasProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.2], fov: 42, near: 0.1, far: 20 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.9} />
      <Suspense fallback={null}>
        <ConexaCompanionScene
          sectionCount={sectionCount}
          activeIndex={activeIndex}
          pose={pose}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </Canvas>
  );
}
