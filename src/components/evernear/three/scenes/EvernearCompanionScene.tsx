"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";
import { Color, Vector3 } from "three";
import { EvernearMascotSprite } from "@/components/evernear/three/EvernearMascotSprite";
import { C } from "@/components/evernear/three/palette";
import type { MascotPose } from "@/lib/mascot-poses";

type EvernearCompanionSceneProps = {
  sectionCount: number;
  activeIndex: number;
  pose: MascotPose;
  reducedMotion?: boolean;
};

function nodeY(index: number, count: number) {
  if (count <= 1) return 0;
  const t = index / (count - 1);
  return 2.4 - t * 4.8;
}

export function EvernearCompanionScene({
  sectionCount,
  activeIndex,
  pose,
  reducedMotion = false,
}: EvernearCompanionSceneProps) {
  const nodes = useMemo(
    () =>
      Array.from({ length: Math.max(sectionCount, 1) }, (_, i) =>
        new Vector3(0, nodeY(i, sectionCount), 0),
      ),
    [sectionCount],
  );

  const spinePoints = useMemo(() => {
    if (nodes.length < 2) return nodes.length ? [nodes[0], nodes[0]] : [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];
    return nodes;
  }, [nodes]);

  return (
    <group position={[0.15, 0, 0]}>
      <Line
        points={spinePoints}
        color={C.violetSoft}
        lineWidth={1.2}
        transparent
        opacity={0.35}
      />
      {activeIndex > 0 && nodes[activeIndex - 1] && nodes[activeIndex] ? (
        <Line
          points={[nodes[activeIndex - 1], nodes[activeIndex]]}
          color={C.green}
          lineWidth={2.4}
          transparent
          opacity={0.9}
        />
      ) : null}
      {nodes.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[index === activeIndex ? 0.09 : 0.055, 16, 16]} />
          <meshBasicMaterial
            color={new Color(index === activeIndex ? C.green : C.violetSoft)}
            transparent
            opacity={index === activeIndex ? 0.95 : 0.45}
          />
        </mesh>
      ))}
      <EvernearMascotSprite
        pose={pose}
        targetY={nodeY(activeIndex, sectionCount)}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}
