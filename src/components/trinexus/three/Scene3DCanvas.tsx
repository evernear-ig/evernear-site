"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { BridgeScene } from "./scenes/BridgeScene";
import { ArcScene, NetworkScene } from "./scenes/AmbientScenes";
import { C } from "./palette";

export type Scene3DVariant = "bridge" | "network" | "arc";

type Rig = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

const RIGS: Record<Scene3DVariant, Rig> = {
  bridge: { position: [2.6, 2.7, 14.2], target: [0.6, 0.15, 0], fov: 38 },
  network: { position: [0, 0.8, 9.6], target: [0, 0, 0], fov: 42 },
  arc: { position: [0, 1.4, 12.4], target: [0, 0.4, 0], fov: 40 },
};

function Lights() {
  return (
    <>
      <ambientLight intensity={0.75} color={C.violetSoft} />
      <hemisphereLight args={[C.violetSoft, C.space, 0.7]} />
      <directionalLight position={[7, 11, 9]} intensity={2.3} color={C.white} />
      <directionalLight position={[-9, 5, 6]} intensity={0.9} color={C.violetSoft} />
      <directionalLight position={[-6, 3, -8]} intensity={0.6} color={C.violet} />
    </>
  );
}

function Scene({ variant, labels }: { variant: Scene3DVariant; labels: string[] }) {
  switch (variant) {
    case "bridge":
      return <BridgeScene labels={labels} />;
    case "network":
      return <NetworkScene />;
    case "arc":
      return <ArcScene />;
  }
}

export default function Scene3DCanvas({
  variant,
  labels = [],
  frameloop = "always",
}: {
  variant: Scene3DVariant;
  labels?: string[];
  frameloop?: "always" | "demand";
}) {
  const rig = RIGS[variant];

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: rig.position, fov: rig.fov, near: 0.1, far: 120 }}
      onCreated={({ camera }) => camera.lookAt(...rig.target)}
    >
      <Lights />
      <Suspense fallback={null}>
        <Scene variant={variant} labels={labels} />
      </Suspense>
    </Canvas>
  );
}
