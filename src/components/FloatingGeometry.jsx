import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingIcosahedron({ position, color, speed, distort }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
      meshRef.current.rotation.y += speed * 0.002;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5} floatingRange={[-0.3, 0.3]}>
      <mesh ref={meshRef} position={position} scale={0.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={distort}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, color, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * 0.003;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.2;
    }
  });

  return (
    <Float speed={speed * 0.7} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={0.5}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.002;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.15) * 0.5;
    }
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={0.6}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <MeshWobbleMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe
          factor={0.3}
          speed={1}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0003;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#60a5fa"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function FloatingGeometry() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#818cf8" />
        <pointLight position={[0, 5, -5]} intensity={0.2} color="#c084fc" />

        <FloatingIcosahedron position={[-3, 1.5, 0]} color="#60a5fa" speed={1.2} distort={0.3} />
        <FloatingIcosahedron position={[3.5, -1, -1]} color="#818cf8" speed={0.8} distort={0.4} />
        <FloatingOctahedron position={[2, 2.5, -2]} color="#c084fc" speed={1} />
        <FloatingOctahedron position={[-2.5, -2, -1]} color="#60a5fa" speed={1.3} />
        <FloatingTorus position={[0, -2.5, -3]} color="#818cf8" speed={0.6} />
        <FloatingTorus position={[-4, 0, -2]} color="#f472b6" speed={0.9} />

        <ParticleField />
      </Canvas>
    </div>
  );
}
