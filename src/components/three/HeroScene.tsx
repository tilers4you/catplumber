"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Pipe segment ─────────────────────────────────────────────────────────────

interface PipeProps {
  start: [number, number, number];
  end: [number, number, number];
  radius?: number;
  color?: string;
}

function Pipe({ start, end, radius = 0.08, color = "#1B5E8A" }: PipeProps) {
  const ref = useRef<THREE.Mesh>(null!);

  const { midpoint, length, quaternion } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5);
    const len = s.distanceTo(e);
    const dir = new THREE.Vector3().subVectors(e, s).normalize();
    const axis = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(axis, dir);
    return { midpoint: mid, length: len, quaternion: q };
  }, [start, end]);

  return (
    <mesh
      ref={ref}
      position={[midpoint.x, midpoint.y, midpoint.z]}
      quaternion={quaternion}
    >
      <cylinderGeometry args={[radius, radius, length, 8]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
    </mesh>
  );
}

// ── Water drop particle ───────────────────────────────────────────────────────

interface WaterDropProps {
  path: Array<[number, number, number]>;
  speed: number;
  offset: number;
}

function WaterDrop({ path, speed, offset }: WaterDropProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const progressRef = useRef(offset % 1);

  useFrame((_, delta) => {
    progressRef.current = (progressRef.current + delta * speed) % 1;
    const t = progressRef.current;
    const segCount = path.length - 1;
    const segT = t * segCount;
    const seg = Math.min(Math.floor(segT), segCount - 1);
    const localT = segT - seg;

    const s = new THREE.Vector3(...path[seg]);
    const e = new THREE.Vector3(...path[seg + 1]);
    const pos = s.lerp(e, localT);

    ref.current.position.set(pos.x, pos.y, pos.z);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 6, 6]} />
      <meshStandardMaterial
        color="#2EC4B6"
        emissive="#2EC4B6"
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.2}
      />
    </mesh>
  );
}

// ── Pipe network (procedural) ────────────────────────────────────────────────

const PIPE_SEGMENTS: Array<[[number, number, number], [number, number, number], string]> = [
  [[-4, 1, -2], [-1, 1, -2], "#1B5E8A"],
  [[-1, 1, -2], [-1, -1, -2], "#1B5E8A"],
  [[-1, -1, -2], [2, -1, -2], "#1a4f75"],
  [[2, -1, -2], [2, 1.5, -2], "#1B5E8A"],
  [[2, 1.5, -2], [4.5, 1.5, -2], "#1a4f75"],
  [[-3, 2.5, -3], [-3, 0, -3], "#174566"],
  [[-3, 0, -3], [1, 0, -3], "#174566"],
  [[1, 0, -3], [1, 2, -3], "#174566"],
  [[1, 2, -3], [3.5, 2, -3], "#1B5E8A"],
  [[0, -2, -2], [0, -0.5, -2], "#1a4f75"],
  [[0, -0.5, -2], [3, -0.5, -2], "#1B5E8A"],
  // Joints / connectors (short horizontal tees)
  [[-1, 1, -2], [-1, 1, -3.5], "#2EC4B6"],
  [[2, 1.5, -2], [2, 1.5, -3.5], "#2EC4B6"],
];

// Paths for water particles (must trace existing pipe routes)
const WATER_PATHS: Array<Array<[number, number, number]>> = [
  [[-4, 1, -2], [-1, 1, -2], [-1, -1, -2], [2, -1, -2]],
  [[2, -1, -2], [2, 1.5, -2], [4.5, 1.5, -2]],
  [[-3, 2.5, -3], [-3, 0, -3], [1, 0, -3], [1, 2, -3], [3.5, 2, -3]],
  [[0, -2, -2], [0, -0.5, -2], [3, -0.5, -2]],
];

// Joint spheres at bends
const JOINTS: Array<[number, number, number]> = [
  [-1, 1, -2],
  [-1, -1, -2],
  [2, -1, -2],
  [2, 1.5, -2],
  [-3, 0, -3],
  [1, 0, -3],
  [1, 2, -3],
  [0, -0.5, -2],
];

function Joint({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.12, 8, 8]} />
      <meshStandardMaterial color="#2EC4B6" roughness={0.3} metalness={0.7} />
    </mesh>
  );
}

// ── Mouse parallax camera ────────────────────────────────────────────────────

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.6 - target.current.x) * 0.05;
    target.current.y += (mouse.current.y * 0.3 - target.current.y) * 0.05;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Scene root ───────────────────────────────────────────────────────────────

function PipeScene() {
  const waterDrops = useMemo(
    () =>
      WATER_PATHS.flatMap((path, pi) =>
        Array.from({ length: 5 }, (_, di) => ({
          key: `drop-${pi}-${di}`,
          path,
          speed: 0.18 + pi * 0.03 + di * 0.01,
          offset: di / 5,
        }))
      ),
    []
  );

  return (
    <>
      <CameraRig />

      {/* Lighting */}
      <ambientLight color="#1B5E8A" intensity={1.2} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        color="#4da6d5"
      />
      <pointLight position={[-3, 3, 1]} color="#2EC4B6" intensity={0.8} />
      <pointLight position={[3, -2, 0]} color="#D4782F" intensity={0.4} />

      {/* Pipes */}
      {PIPE_SEGMENTS.map(([s, e, c], i) => (
        <Pipe key={`pipe-${i}`} start={s} end={e} color={c} />
      ))}

      {/* Joints */}
      {JOINTS.map((pos, i) => (
        <Joint key={`joint-${i}`} position={pos} />
      ))}

      {/* Water drops */}
      {waterDrops.map((d) => (
        <WaterDrop key={d.key} path={d.path} speed={d.speed} offset={d.offset} />
      ))}
    </>
  );
}

// ── Static gradient fallback (prefers-reduced-motion) ───────────────────────

function StaticGradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 30% 60%, #2EC4B6 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, #1B5E8A 0%, transparent 60%)",
      }}
      aria-hidden="true"
    />
  );
}

// ── HeroScene ────────────────────────────────────────────────────────────────

export function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reducedMotion) return <StaticGradientFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <React.Suspense fallback={null}>
        <PipeScene />
      </React.Suspense>
    </Canvas>
  );
}
