"use client";

import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  DoubleSide,
  Group,
  Material,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
} from "three";
import { resolveImageSrc } from "@/lib/images";
import { createCrateTexture, type CrateIcon } from "./crateTexture";
import { C } from "./palette";

export type HumanProps = {
  /** Shared crate shell material for the five unprinted faces. */
  crateMat: Material;
  label: string;
  icon: CrateIcon;
  /** Evernear image key, e.g. ecosystem.deporte */
  imageKey: string;
  /** Offsets the walk cycle so no two figures step in sync. */
  phase: number;
  cadence?: number;
  /** Extra yaw on top of the travel direction, for a three-quarter read. */
  yaw?: number;
};

/**
 * Walker built from real regional photography on crossed billboards, plus the
 * labelled crate they carry toward the connection node.
 */
export function Human({
  crateMat,
  label,
  icon,
  imageKey,
  phase,
  cadence = 4.4,
  yaw = Math.PI / 2 - 0.3,
}: HumanProps) {
  const bob = useRef<Group>(null);
  const body = useRef<Group>(null);
  const photoSrc = resolveImageSrc(imageKey, 720) ?? resolveImageSrc("ecosystem.deporte", 720)!;
  const photoTexture = useTexture(photoSrc);

  useEffect(() => {
    photoTexture.colorSpace = SRGBColorSpace;
    photoTexture.anisotropy = 4;
  }, [photoTexture]);

  const figureMat = useMemo(
    () =>
      new MeshBasicMaterial({
        map: photoTexture,
        transparent: true,
        alphaTest: 0.04,
        side: DoubleSide,
        toneMapped: false,
      }),
    [photoTexture],
  );

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
      figureMat.map?.dispose();
      figureMat.dispose();
      faceMat.map?.dispose();
      faceMat.dispose();
    },
    [figureMat, faceMat],
  );

  const crateMats = useMemo(
    () => [crateMat, crateMat, crateMat, crateMat, faceMat, crateMat],
    [crateMat, faceMat],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * cadence + phase;
    const swing = Math.sin(t);
    const stride = Math.sin(t * 2);

    if (bob.current) {
      bob.current.position.y = Math.abs(swing) * 0.055;
      bob.current.rotation.z = swing * 0.022;
    }

    if (body.current) {
      body.current.rotation.x = stride * 0.04;
      body.current.position.z = stride * 0.018;
    }
  });

  return (
    <group ref={bob}>
      <group ref={body} rotation={[0, yaw, 0]}>
        <mesh material={figureMat} position={[0, 0.98, 0]}>
          <planeGeometry args={[0.74, 1.22]} />
        </mesh>
        <mesh
          material={figureMat}
          position={[0, 0.98, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <planeGeometry args={[0.74, 1.22]} />
        </mesh>
      </group>

      {/* Crate stays world-aligned so its printed face always reads to camera. */}
      <group position={[0.38, 0.96, 0.08]}>
        <mesh material={crateMats}>
          <boxGeometry args={[0.66, 0.5, 0.26]} />
        </mesh>
      </group>
    </group>
  );
}
