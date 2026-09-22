"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import {
  BufferAttribute,
  BufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Points,
  Vector3,
} from "three";
import { C } from "../palette";

/** Deterministic noise so every visitor sees the same composition. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function segmentsGeometry(pairs: [Vector3, Vector3][]) {
  const position = new Float32Array(pairs.length * 6);
  pairs.forEach(([a, b], i) => {
    position.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
  });
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(position, 3));
  return geometry;
}

/* ---------------------------------------------------------------- network */

/** "Las personas son la red": a slowly turning constellation of profiles. */
export function NetworkScene() {
  const group = useRef<Group>(null);
  const packets = useRef<(Mesh | null)[]>([]);

  const { nodes, links, linkGeo } = useMemo(() => {
    const random = rng(97);
    const pts: Vector3[] = [];
    for (let i = 0; i < 28; i++) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const r = 2.6 + random() * 1.9;
      pts.push(
        new Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.52,
          r * Math.sin(phi) * Math.sin(theta) * 0.7,
        ),
      );
    }

    const pairs: [Vector3, Vector3][] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pairs.length >= 46) break;
        if (pts[i].distanceTo(pts[j]) < 2.35) pairs.push([pts[i], pts[j]]);
      }
    }

    return { nodes: pts, links: pairs, linkGeo: segmentsGeometry(pairs) };
  }, []);

  const nodeMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: C.white,
        emissive: C.violetSoft,
        emissiveIntensity: 0.7,
        roughness: 0.35,
      }),
    [],
  );
  const hotMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: C.green,
        emissive: C.green,
        emissiveIntensity: 1.8,
        roughness: 0.3,
      }),
    [],
  );

  useEffect(
    () => () => {
      linkGeo.dispose();
      nodeMat.dispose();
      hotMat.dispose();
    },
    [linkGeo, nodeMat, hotMat],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.07;
      group.current.rotation.x = Math.sin(t * 0.13) * 0.12;
    }
    packets.current.forEach((packet, i) => {
      if (!packet) return;
      const route = links[(i * 7) % links.length];
      const k = (t / 3.1 + i * 0.27) % 1;
      packet.position.lerpVectors(route[0], route[1], k);
      (packet.material as MeshStandardMaterial).opacity = Math.sin(k * Math.PI) ** 0.5;
    });
  });

  return (
    <group ref={group}>
      <lineSegments geometry={linkGeo}>
        <lineBasicMaterial color={C.violetSoft} transparent opacity={0.28} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p} material={i % 6 === 0 ? hotMat : nodeMat}>
          <sphereGeometry args={[i % 6 === 0 ? 0.13 : 0.085, 14, 12]} />
        </mesh>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          ref={(node) => {
            packets.current[i] = node;
          }}
        >
          <sphereGeometry args={[0.055, 10, 8]} />
          <meshStandardMaterial
            color={C.green}
            emissive={C.green}
            emissiveIntensity={2.2}
            transparent
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------- arc */

/** Access as a single span: everything that crosses it arrives somewhere. */
export function ArcScene() {
  const packets = useRef<(Mesh | null)[]>([]);

  const arc = (x: number) => 3.3 * (1 - (x / 6.2) ** 2);

  const { points, pierGeo } = useMemo(() => {
    const pts = Array.from({ length: 70 }, (_, i) => {
      const x = -6.2 + (12.4 * i) / 69;
      return new Vector3(x, arc(x), 0);
    });
    const pairs: [Vector3, Vector3][] = [];
    for (let x = -5.2; x <= 5.2; x += 0.7) {
      pairs.push([new Vector3(x, arc(x), 0), new Vector3(x, -1.4, 0)]);
    }
    return { points: pts, pierGeo: segmentsGeometry(pairs) };
  }, []);

  useEffect(() => () => pierGeo.dispose(), [pierGeo]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    packets.current.forEach((packet, i) => {
      if (!packet) return;
      const k = (t / 5 + i * 0.25) % 1;
      const x = -6.2 + 12.4 * k;
      packet.position.set(x, arc(x) + 0.1, 0);
      (packet.material as MeshStandardMaterial).opacity = Math.sin(k * Math.PI) ** 0.4;
    });
  });

  return (
    <group position={[0, -0.6, 0]} rotation={[0.1, -0.3, 0]}>
      <lineSegments geometry={pierGeo}>
        <lineBasicMaterial color={C.violetSoft} transparent opacity={0.22} />
      </lineSegments>
      <Line points={points.map((p) => p.toArray())} color={C.white} lineWidth={2} transparent opacity={0.5} />
      <Line
        points={points.map((p) => [p.x, p.y - 0.14, p.z] as [number, number, number])}
        color={C.green}
        lineWidth={1.4}
        transparent
        opacity={0.45}
      />
      {[-6.2, 6.2].map((x) => (
        <mesh key={x} position={[x, arc(x), 0]}>
          <sphereGeometry args={[0.16, 16, 14]} />
          <meshStandardMaterial
            color={C.green}
            emissive={C.green}
            emissiveIntensity={1.8}
            roughness={0.3}
          />
        </mesh>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(node) => {
            packets.current[i] = node;
          }}
        >
          <sphereGeometry args={[0.07, 12, 10]} />
          <meshStandardMaterial
            color={C.green}
            emissive={C.green}
            emissiveIntensity={2.4}
            transparent
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
