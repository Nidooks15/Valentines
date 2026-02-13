import React, { useMemo } from 'react';
import { Float } from '@react-three/drei';

// Single 3D Teddy Bear
const TeddyBear = ({ position, scale }) => {
  return (
    <group position={position} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFB6C1" emissive="#FFB6C1" emissiveIntensity={0.2} roughness={0.6} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFC0CB" emissive="#FFC0CB" emissiveIntensity={0.2} roughness={0.6} />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-0.15, 0.55, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#FFB6C1" emissive="#FFB6C1" emissiveIntensity={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0.15, 0.55, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#FFB6C1" emissive="#FFB6C1" emissiveIntensity={0.2} roughness={0.6} />
      </mesh>
      
      {/* Snout */}
      <mesh position={[0, 0.35, 0.15]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FFE4E1" emissive="#FFE4E1" emissiveIntensity={0.1} roughness={0.6} />
      </mesh>
      
      
      {/* Eyes - Bigger and more visible */}
      <mesh position={[-0.08, 0.45, 0.18]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.08, 0.45, 0.18]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 0.38, 0.22]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Smile - curved mouth */}
      <mesh position={[-0.04, 0.32, 0.2]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 0.31, 0.21]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.04, 0.32, 0.2]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Heart on belly */}
      <mesh position={[0, 0.05, 0.28]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.06, 0.1, 0.28]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.06, 0.1, 0.28]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Bow tie */}
      <mesh position={[0, 0.25, 0.2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.15, 0.06, 0.04]} />
        <meshStandardMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.25, 0.2]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.4} />
      </mesh>

      
      {/* Arms */}
      <mesh position={[-0.25, 0.05, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
        <meshStandardMaterial color="#FFB6C1" emissive="#FFB6C1" emissiveIntensity={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0.25, 0.05, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
        <meshStandardMaterial color="#FFB6C1" emissive="#FFB6C1" emissiveIntensity={0.2} roughness={0.6} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.12, -0.35, 0]}>
        <capsuleGeometry args={[0.1, 0.2, 8, 16]} />
        <meshStandardMaterial color="#FFB6C1" emissive="#FFB6C1" emissiveIntensity={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0.12, -0.35, 0]}>
        <capsuleGeometry args={[0.1, 0.2, 8, 16]} />
        <meshStandardMaterial color="#FFB6C1" emissive="#FFB6C1" emissiveIntensity={0.2} roughness={0.6} />
      </mesh>
    </group>
  );
};

const TeddyBears = ({ count = 8 }) => {
  const bears = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (6 + Math.random() * 2);
      const y = (Math.random() - 0.5) * 8;
      const z = -2 - Math.random() * 3;
      const scale = 0.8 + Math.random() * 0.4;
      temp.push({ x, y, z, scale });
    }
    return temp;
  }, [count]);

  return (
    <>
      {bears.map((bear, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.3} floatIntensity={0.5}>
          <TeddyBear position={[bear.x, bear.y, bear.z]} scale={bear.scale} />
        </Float>
      ))}
    </>
  );
};

export default TeddyBears;
