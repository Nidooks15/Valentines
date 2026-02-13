import React, { useMemo } from 'react';
import { Float } from '@react-three/drei';

// Single 3D Flower Component
const Flower = ({ position, scale, color }) => {
  const petalCount = 5;
  const petals = useMemo(() => {
    const temp = [];
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const x = Math.cos(angle) * 0.3;
      const y = Math.sin(angle) * 0.3;
      temp.push({ x, y, angle });
    }
    return temp;
  }, []);

  return (
    <group position={position} scale={scale}>
      {/* Flower center */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Petals */}
      {petals.map((petal, i) => (
        <mesh key={i} position={[petal.x, petal.y, 0]} rotation={[0, 0, petal.angle]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.2}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      ))}
      
      {/* Stem */}
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
};

const Flowers = ({ count = 30 }) => {
  const flowers = useMemo(() => {
    const temp = [];
    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FF6B9D', '#FFC0CB'];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10 - 2;
      const scale = 0.5 + Math.random() * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      temp.push({ x, y, z, scale, color });
    }
    return temp;
  }, [count]);

  return (
    <>
      {flowers.map((flower, i) => (
        <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <Flower position={[flower.x, flower.y, flower.z]} scale={flower.scale} color={flower.color} />
        </Float>
      ))}
    </>
  );
};

export default Flowers;
