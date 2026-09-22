"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from "three";
import { Human } from "../Human";
import { C } from "../palette";
import type { CrateIcon } from "../crateTexture";

const HALF = 8;
const SPAN = HALF * 2;
const CAMBER = 0.42;
const TOWER_X = 3.4;
const TOWER_TOP = 4.4;
const CABLE_SAG = 2.55;
const DECK_HALF_W = 0.82;
const CABLE_Z = 0.66;

/** Deck camber: flat at the abutments, slightly crowned at midspan. */
const deckY = (x: number) => CAMBER * (1 - (x / HALF) ** 2);

const cableY = (x: number) => {
  const ax = Math.abs(x);
  if (ax <= TOWER_X) return CABLE_SAG + (TOWER_TOP - CABLE_SAG) * (ax / TOWER_X) ** 2;
  const u = (ax - TOWER_X) / (HALF - TOWER_X);
  return TOWER_TOP * (1 - u) ** 1.5;
};

function deckRibbon(halfWidth: number, yOffset: number, segments = 72) {
  const position = new Float32Array((segments + 1) * 6);
  const uv = new Float32Array((segments + 1) * 4);
  const index: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const x = -HALF + (i / segments) * SPAN;
    const y = deckY(x) + yOffset;
    const o = i * 6;
    position[o] = x;
    position[o + 1] = y;
    position[o + 2] = -halfWidth;
    position[o + 3] = x;
    position[o + 4] = y;
    position[o + 5] = halfWidth;
    const u = (i / segments) * 26;
    uv[i * 4] = u;
    uv[i * 4 + 1] = 0;
    uv[i * 4 + 2] = u;
    uv[i * 4 + 3] = 1;
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(position, 3));
  geometry.setAttribute("uv", new BufferAttribute(uv, 2));
  geometry.setIndex(index);
  geometry.computeVertexNormals();
  return geometry;
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

function curvePoints(from: number, to: number, y: (x: number) => number, z: number, steps = 40) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = from + ((to - from) * i) / steps;
    return new Vector3(x, y(x), z);
  });
}

function Tower({ x, material }: { x: number; material: MeshStandardMaterial }) {
  const base = deckY(x) - 0.5;
  const height = TOWER_TOP - base;

  return (
    <group position={[x, 0, 0]}>
      {[-CABLE_Z, CABLE_Z].map((z) => (
        <mesh key={z} material={material} position={[0, base + height / 2, z]}>
          <boxGeometry args={[0.15, height, 0.18]} />
        </mesh>
      ))}
      {[deckY(x) + 1.0, deckY(x) + 2.5, TOWER_TOP - 0.12].map((y) => (
        <mesh key={y} material={material} position={[0, y, 0]}>
          <boxGeometry args={[0.1, 0.12, CABLE_Z * 2]} />
        </mesh>
      ))}
    </group>
  );
}

type WalkerSpec = {
  icon: CrateIcon;
  lane: number;
  speed: number;
  start: number;
};

const WALKERS: WalkerSpec[] = [
  { icon: "ball", lane: -0.4, speed: 0.55, start: 0 },
  { icon: "pin", lane: 0.36, speed: 0.55, start: 2.3 },
  { icon: "code", lane: -0.32, speed: 0.55, start: 4.6 },
  { icon: "heart", lane: 0.4, speed: 0.55, start: 6.9 },
  { icon: "bag", lane: -0.36, speed: 0.55, start: 9.2 },
  { icon: "mic", lane: 0.34, speed: 0.55, start: 11.5 },
  { icon: "dots", lane: -0.3, speed: 0.55, start: 13.8 },
];

function Walker({
  spec,
  label,
  figureMat,
  crateMat,
}: {
  spec: WalkerSpec;
  label: string;
  figureMat: MeshStandardMaterial;
  crateMat: MeshStandardMaterial;
}) {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    const raw = spec.start + clock.elapsedTime * spec.speed;
    const x = (((raw % SPAN) + SPAN) % SPAN) - HALF;
    group.current?.position.set(x, deckY(x) + 0.02, spec.lane);
  });

  return (
    <group ref={group}>
      <Human
        figureMat={figureMat}
        crateMat={crateMat}
        label={label}
        icon={spec.icon}
        phase={spec.start * 1.7}
        cadence={spec.speed * 7.4}
      />
    </group>
  );
}

const ARRIVAL = new Vector3(4.4, 3.15, 0.7);
const SATELLITES: Vector3[] = [
  new Vector3(-0.98, 0.74, 0.3),
  new Vector3(1.02, 0.52, -0.22),
  new Vector3(0.86, -0.86, 0.36),
  new Vector3(-0.82, -0.78, -0.26),
];
const DECK_TAP = new Vector3(5.1 - ARRIVAL.x, deckY(5.1) + 0.5 - ARRIVAL.y, -ARRIVAL.z);

function Arrival({ nodeMat }: { nodeMat: MeshStandardMaterial }) {
  const rings = useRef<(Mesh | null)[]>([null, null]);
  const packets = useRef<(Mesh | null)[]>([null, null, null, null, null]);

  const routes = useMemo<[Vector3, Vector3][]>(
    () => [
      [DECK_TAP, new Vector3(0, 0, 0)],
      ...SATELLITES.map((s) => [new Vector3(0, 0, 0), s] as [Vector3, Vector3]),
    ],
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const k = (t / 4.4 + i * 0.5) % 1;
      const s = 0.5 + k * 3.4;
      ring.scale.setScalar(s);
      const material = ring.material as MeshStandardMaterial;
      material.opacity = 0.5 * (1 - k) ** 1.6;
    });

    packets.current.forEach((packet, i) => {
      if (!packet) return;
      const [from, to] = routes[i];
      const k = (t / 2.6 + i * 0.21) % 1;
      packet.position.lerpVectors(from, to, k);
      const material = packet.material as MeshStandardMaterial;
      material.opacity = Math.sin(k * Math.PI) ** 0.6;
    });
  });

  return (
    <group position={ARRIVAL}>
      <Line
        points={[
          [0, 0.64, 0],
          [0.56, -0.32, 0],
          [-0.56, -0.32, 0],
          [0, 0.64, 0],
        ]}
        color={C.white}
        lineWidth={1.4}
        transparent
        opacity={0.55}
      />
      {routes.map(([from, to], i) => (
        <Line
          key={i}
          points={[from.toArray(), to.toArray()]}
          color={C.green}
          lineWidth={1.1}
          transparent
          opacity={i === 0 ? 0.5 : 0.34}
        />
      ))}

      <mesh material={nodeMat}>
        <sphereGeometry args={[0.14, 20, 16]} />
      </mesh>
      {SATELLITES.map((s, i) => (
        <mesh key={i} material={nodeMat} position={s}>
          <sphereGeometry args={[0.075, 14, 12]} />
        </mesh>
      ))}

      {[0, 1].map((i) => (
        <mesh
          key={i}
          ref={(node) => {
            rings.current[i] = node;
          }}
        >
          <torusGeometry args={[0.24, 0.012, 8, 44]} />
          <meshStandardMaterial
            color={C.green}
            emissive={C.green}
            emissiveIntensity={1.6}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      ))}

      {routes.map((_, i) => (
        <mesh
          key={i}
          ref={(node) => {
            packets.current[i] = node;
          }}
        >
          <sphereGeometry args={[0.055, 12, 10]} />
          <meshStandardMaterial
            color={C.green}
            emissive={C.green}
            emissiveIntensity={2.2}
            transparent
            depthWrite={false}
          />
        </mesh>
      ))}

      <pointLight color={C.green} intensity={4.5} distance={7} decay={2} />
    </group>
  );
}

export function BridgeScene({ labels }: { labels: string[] }) {
  const mats = useMemo(
    () => ({
      figure: new MeshStandardMaterial({
        color: "#e2e7f7",
        roughness: 0.44,
        metalness: 0.06,
        emissive: C.violetSoft,
        emissiveIntensity: 0.1,
      }),
      crate: new MeshStandardMaterial({
        color: "#131A38",
        roughness: 0.58,
        metalness: 0.12,
        emissive: C.green,
        emissiveIntensity: 0.05,
      }),
      structure: new MeshStandardMaterial({
        color: "#171E42",
        roughness: 0.52,
        metalness: 0.3,
      }),
      deck: new MeshStandardMaterial({
        color: "#1B2249",
        roughness: 0.66,
        metalness: 0.16,
        side: DoubleSide,
      }),
      node: new MeshStandardMaterial({
        color: C.green,
        emissive: C.green,
        emissiveIntensity: 1.5,
        roughness: 0.3,
      }),
    }),
    [],
  );

  const deckGeo = useMemo(() => deckRibbon(DECK_HALF_W, 0, 84), []);
  const underGeo = useMemo(() => deckRibbon(DECK_HALF_W * 0.82, -0.22, 84), []);

  const hangerGeo = useMemo(() => {
    const pairs: [Vector3, Vector3][] = [];
    const xs: number[] = [];
    for (let x = -TOWER_X + 0.36; x <= TOWER_X - 0.3; x += 0.72) xs.push(x);
    for (const x of [4.6, 5.9, 7.2, 8.5, -4.6, -5.9, -7.2, -8.5]) xs.push(x);
    for (const x of xs) {
      for (const z of [-CABLE_Z, CABLE_Z]) {
        pairs.push([new Vector3(x, cableY(x), z), new Vector3(x, deckY(x) + 0.32, z)]);
      }
    }
    return segmentsGeometry(pairs);
  }, []);

  const railGeo = useMemo(() => {
    const pairs: [Vector3, Vector3][] = [];
    for (let x = -HALF; x < HALF; x += 0.5) {
      for (const z of [-DECK_HALF_W, DECK_HALF_W]) {
        pairs.push([new Vector3(x, deckY(x), z), new Vector3(x, deckY(x) + 0.3, z)]);
      }
    }
    return segmentsGeometry(pairs);
  }, []);

  const waterGeo = useMemo(() => {
    const pairs: [Vector3, Vector3][] = [];
    for (let i = 0; i < 9; i++) {
      const y = -2.9;
      const z = 3.4 - i * 1.6;
      const w = 6 + i * 0.7;
      pairs.push([new Vector3(-w, y, z), new Vector3(w, y, z)]);
    }
    return segmentsGeometry(pairs);
  }, []);

  useEffect(
    () => () => {
      Object.values(mats).forEach((m) => m.dispose());
      [deckGeo, underGeo, hangerGeo, railGeo, waterGeo].forEach((g) => g.dispose());
    },
    [mats, deckGeo, underGeo, hangerGeo, railGeo, waterGeo],
  );

  return (
    <group position={[0, -1.1, 0]}>
      <lineSegments geometry={waterGeo}>
        <lineBasicMaterial color={C.violetSoft} transparent opacity={0.2} />
      </lineSegments>

      <mesh geometry={deckGeo} material={mats.deck} />
      <mesh geometry={underGeo} material={mats.structure} />
      <lineSegments geometry={railGeo}>
        <lineBasicMaterial color={C.white} transparent opacity={0.18} />
      </lineSegments>
      <lineSegments geometry={hangerGeo}>
        <lineBasicMaterial color={C.violetSoft} transparent opacity={0.38} />
      </lineSegments>

      <Line
        points={curvePoints(-HALF, HALF, (x) => deckY(x) + 0.3, -DECK_HALF_W, 80).map((p) => p.toArray())}
        color={C.white}
        lineWidth={1.2}
        transparent
        opacity={0.4}
      />
      <Line
        points={curvePoints(-HALF, HALF, (x) => deckY(x) + 0.3, DECK_HALF_W, 80).map((p) => p.toArray())}
        color={C.white}
        lineWidth={1.2}
        transparent
        opacity={0.4}
      />
      <Line
        points={curvePoints(-HALF, HALF, (x) => deckY(x) + 0.015, 0, 80).map((p) => p.toArray())}
        color={C.green}
        lineWidth={1.6}
        transparent
        opacity={0.42}
      />

      {[-CABLE_Z, CABLE_Z].map((z) => (
        <Line
          key={z}
          points={curvePoints(-HALF, HALF, cableY, z, 90).map((p) => p.toArray())}
          color={C.violetSoft}
          lineWidth={2.2}
          transparent
          opacity={0.72}
        />
      ))}

      <Tower x={-TOWER_X} material={mats.structure} />
      <Tower x={TOWER_X} material={mats.structure} />

      {WALKERS.map((spec, i) => (
        <Walker
          key={spec.icon}
          spec={spec}
          label={labels[i % labels.length]}
          figureMat={mats.figure}
          crateMat={mats.crate}
        />
      ))}

      <Arrival nodeMat={mats.node} />
    </group>
  );
}
