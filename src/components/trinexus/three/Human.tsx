"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, Group, Material, MeshStandardMaterial } from "three";
import { createCrateTexture, type CrateIcon } from "./crateTexture";
import { C } from "./palette";

export type HumanProps = {
  /** Shared body material, created once per scene. */
  figureMat: Material;
  /** Shared crate shell material for the five unprinted faces. */
  crateMat: Material;
  label: string;
  icon: CrateIcon;
  /** Offsets the walk cycle so no two figures step in sync. */
  phase: number;
  cadence?: number;
  /** Extra yaw on top of the travel direction, for a three-quarter read. */
  yaw?: number;
};

/**
 * Procedural low-poly walker. Built from primitives on purpose: no external
 * model to download, and every proportion stays tunable from here.
 */
export function Human({
  figureMat,
  crateMat,
  label,
  icon,
  phase,
  cadence = 4.4,
  yaw = Math.PI / 2 - 0.3,
}: HumanProps) {
  const bob = useRef<Group>(null);
  const hips = useRef<(Group | null)[]>([null, null]);
  const knees = useRef<(Group | null)[]>([null, null]);
  const arms = useRef<(Group | null)[]>([null, null]);

  const faceMat = useMemo(() => {
    const texture = createCrateTexture(label, icon);
    return new MeshStandardMaterial({
      map: texture,
      emissiveMap: texture,
      emissive: C.white,
      emissiveIntensity: 0.55,
      roughness: 0.62,
      metalness: 0,
      side: DoubleSide,
    });
  }, [label, icon]);

  useEffect(
    () => () => {
      faceMat.map?.dispose();
      faceMat.dispose();
    },
    [faceMat],
  );

  const crateMats = useMemo(
    () => [crateMat, crateMat, crateMat, crateMat, faceMat, crateMat],
    [crateMat, faceMat],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * cadence + phase;
    const swing = Math.sin(t);

    for (let i = 0; i < 2; i++) {
      const s = i === 0 ? swing : -swing;
      const hip = hips.current[i];
      const knee = knees.current[i];
      const arm = arms.current[i];
      if (hip) hip.rotation.x = s * 0.5;
      if (knee) knee.rotation.x = Math.max(0, s) * 0.85;
      if (arm) arm.rotation.x = -1.02 - s * 0.1;
    }

    if (bob.current) {
      bob.current.position.y = Math.abs(swing) * 0.045;
      bob.current.rotation.z = swing * 0.018;
    }
  });

  return (
    <group ref={bob}>
      <group rotation={[0, yaw, 0]}>
        {[-0.115, 0.115].map((x, i) => (
          <group
            key={x}
            ref={(node) => {
              hips.current[i] = node;
            }}
            position={[x, 0.72, 0]}
          >
            <mesh material={figureMat} position={[0, -0.17, 0]}>
              <capsuleGeometry args={[0.072, 0.2, 3, 10]} />
            </mesh>
            <group
              ref={(node) => {
                knees.current[i] = node;
              }}
              position={[0, -0.34, 0]}
            >
              <mesh material={figureMat} position={[0, -0.17, 0]}>
                <capsuleGeometry args={[0.062, 0.22, 3, 10]} />
              </mesh>
              <mesh material={figureMat} position={[0, -0.335, 0.045]}>
                <boxGeometry args={[0.11, 0.055, 0.21]} />
              </mesh>
            </group>
          </group>
        ))}

        <mesh material={figureMat} position={[0, 1.04, 0]}>
          <capsuleGeometry args={[0.15, 0.34, 4, 14]} />
        </mesh>
        <mesh material={figureMat} position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.05, 0.055, 0.1, 10]} />
        </mesh>
        <mesh material={figureMat} position={[0, 1.5, 0.008]}>
          <sphereGeometry args={[0.125, 18, 14]} />
        </mesh>

        {[-0.175, 0.175].map((x, i) => (
          <group
            key={x}
            ref={(node) => {
              arms.current[i] = node;
            }}
            position={[x, 1.28, 0]}
          >
            <mesh material={figureMat} position={[0, -0.19, 0]}>
              <capsuleGeometry args={[0.052, 0.3, 3, 10]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Crate stays world-aligned so its printed face always reads to camera. */}
      <group position={[0.36, 1.0, 0.06]}>
        <mesh material={crateMats}>
          <boxGeometry args={[0.66, 0.5, 0.26]} />
        </mesh>
      </group>
    </group>
  );
}
