// Client-side Canvas wrapper to avoid R3F hook errors
import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Stars() {
  const starsRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const starPositions = useMemo(() => {
    const positions = new Float32Array(15000 * 3);
    for (let i = 0; i < 15000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = -Math.random() * 2000;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.position.z += 0.25;
      if (starsRef.current.position.z > 1000) {
        starsRef.current.position.z = -1000;
      }
    }
    state.camera.position.x += (mouse.current.x * 0.01 - state.camera.position.x) * 0.02;
    state.camera.position.y += (mouse.current.y * 0.01 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={15000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.7} color="#f8f8ff" transparent />
    </points>
  );
}

export function CosmicBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ position: "fixed" }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 75, near: 0.1, far: 3000, position: [0, 0, 0] }}
        style={{ width: "100%", height: "100%" }}
      >
        <Stars />
      </Canvas>
    </div>
  );
}