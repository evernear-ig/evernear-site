"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  SRGBColorSpace,
  Vector3,
} from "three";
import {
  MASCOT_POSE_UV,
  MASCOT_SHEET,
  type MascotPose,
} from "@/lib/mascot-poses";

type ConexaMascotSpriteProps = {
  pose: MascotPose;
  targetY: number;
  reducedMotion?: boolean;
};

export function ConexaMascotSprite({
  pose,
  targetY,
  reducedMotion = false,
}: ConexaMascotSpriteProps) {
  const root = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const texture = useTexture(MASCOT_SHEET);
  const currentY = useRef(targetY);

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
  }, [texture]);

  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.05,
        side: DoubleSide,
        toneMapped: false,
        depthWrite: false,
      }),
    [texture],
  );

  useEffect(() => {
    const uv = MASCOT_POSE_UV[pose];
    texture.offset.set(uv.offset[0], 1 - uv.offset[1] - uv.repeat[1]);
    texture.repeat.set(uv.repeat[0], uv.repeat[1]);
    texture.needsUpdate = true;
  }, [pose, texture]);

  useEffect(
    () => () => {
      material.dispose();
    },
    [material],
  );

  useFrame(({ camera, clock }) => {
    if (!root.current || !mesh.current) return;

    const lerp = reducedMotion ? 1 : 0.08;
    currentY.current += (targetY - currentY.current) * lerp;
    root.current.position.y = currentY.current;

    if (!reducedMotion) {
      const t = clock.elapsedTime;
      root.current.position.y += Math.sin(t * 1.4) * 0.04;
    }

    mesh.current.quaternion.copy(camera.quaternion);
    const camDir = new Vector3();
    camera.getWorldDirection(camDir);
    root.current.position.x = camDir.x * -0.15;
  });

  const scale = pose === "welcome" ? 1.15 : 1;

  return (
    <group ref={root} position={[0, targetY, 0]}>
      <mesh ref={mesh} material={material} scale={[scale * 1.35, scale * 1.35, 1]}>
        <planeGeometry args={[1.4, 1.4]} />
      </mesh>
    </group>
  );
}
