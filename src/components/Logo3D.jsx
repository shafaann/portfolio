import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function ChromeText() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  const layers = Array.from({ length: 20 }, (_, i) => i);

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Depth layers for extrusion effect */}
        {layers.map((i) => (
          <Text
            key={i}
            fontSize={4.5}
            position={[0, 0, -i * 0.06]}
            letterSpacing={0.15}
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEg7oBeUS.woff"
          >
            SM
            <meshPhysicalMaterial
              color={i === 0 ? "#cccccc" : "#777777"}
              metalness={1}
              roughness={i === 0 ? 0.05 : 0.2}
              clearcoat={i === 0 ? 1 : 0}
              clearcoatRoughness={0.05}
              envMapIntensity={i === 0 ? 3 : 1.2}
              reflectivity={1}
              side={THREE.DoubleSide}
            />
          </Text>
        ))}
        {/* Front face with iridescence */}
        <Text
          fontSize={4.5}
          position={[0, 0, 0.08]}
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEg7oBeUS.woff"
        >
          SM
          <meshPhysicalMaterial
            color="#bbbbbb"
            metalness={1}
            roughness={0.02}
            clearcoat={1}
            clearcoatRoughness={0.02}
            envMapIntensity={3.5}
            reflectivity={1}
            iridescence={1}
            iridescenceIOR={1.8}
            sheen={1}
            sheenColor="#00e5ff"
            side={THREE.FrontSide}
          />
        </Text>
      </group>
    </Float>
  );
}

function FloatingOrb({ offset = 0 }) {
  const orbRef = useRef();
  useFrame((state) => {
    if (orbRef.current) {
      const t = state.clock.elapsedTime + offset;
      orbRef.current.position.x = Math.sin(t * 0.25) * 5 + (offset > 0 ? -4 : 4);
      orbRef.current.position.y = Math.cos(t * 0.35) * 2.5 + (offset > 0 ? -1 : 2);
      orbRef.current.position.z = Math.sin(t * 0.15) * 2 + 1;
    }
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[offset > 0 ? 0.06 : 0.1, 32, 32]} />
      <meshStandardMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        emissiveIntensity={offset > 0 ? 2 : 4}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Logo3D() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 35 }}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[8, 8, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, -2, 5]} intensity={0.8} color="#00e5ff" />
        <pointLight position={[0, 6, 4]} intensity={1} color="#ffffff" />
        <spotLight position={[-4, 4, 6]} intensity={1.2} angle={0.4} penumbra={0.6} color="#d0d0ff" />
        <pointLight position={[5, -3, 3]} intensity={0.5} color="#00e5ff" />

        <Environment preset="city" />

        <ChromeText />
        <FloatingOrb offset={0} />
        <FloatingOrb offset={5} />
      </Canvas>
    </div>
  );
}
