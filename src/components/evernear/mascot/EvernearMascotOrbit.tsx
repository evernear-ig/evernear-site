"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, Group } from "three";
import type { MascotConceptTokens } from "@/lib/mascot-concepts";

type EvernearMascotOrbitProps = {
  tokens: MascotConceptTokens;
  assemble: number;
  reducedMotion?: boolean;
};

function OrbitField({
  tokens,
  assemble,
  reducedMotion,
}: EvernearMascotOrbitProps) {
  const root = useRef<Group>(null);
  const scatter = useRef(1);
  const colors = useMemo(
    () => [new Color(tokens.nodeA), new Color(tokens.nodeB), new Color(tokens.accent)],
    [tokens],
  );

  const nodes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        angle: (i / 8) * Math.PI * 2,
        radius: 0.55 + (i % 3) * 0.12,
        tilt: (i % 2) * 0.35,
        color: colors[i % colors.length],
        size: 0.045 + (i % 2) * 0.02,
      })),
    [colors],
  );

  useFrame(({ clock }) => {
    if (!root.current) return;
    const targetScatter = 1 - assemble;
    scatter.current += (targetScatter - scatter.current) * (reducedMotion ? 1 : 0.1);
    const t = clock.elapsedTime * tokens.orbitSpeed;

    root.current.children.forEach((child, i) => {
      const node = nodes[i];
      if (!node) return;
      const spread = 1 + scatter.current * 1.8;
      const a = node.angle + t * (i % 2 === 0 ? 1 : -1);
      child.position.x = Math.cos(a) * node.radius * spread;
      child.position.y = Math.sin(a + node.tilt) * node.radius * spread * 0.72;
      child.position.z = Math.sin(a) * 0.12 * spread;
      child.scale.setScalar(0.92 + assemble * 0.12);
    });
  });

  return (
    <group ref={root}>
      {nodes.map((node, i) => (
        <mesh key={i}>
          <sphereGeometry args={[node.size, 12, 12]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

export function EvernearMascotOrbit({
  tokens,
  assemble,
  reducedMotion = false,
}: EvernearMascotOrbitProps) {
  return (
    <Canvas
      frameloop={reducedMotion ? "demand" : "always"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 2.4], fov: 42 }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.8} />
      <OrbitField tokens={tokens} assemble={assemble} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
