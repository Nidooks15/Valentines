import React, { useMemo } from 'react';

// Single 3D Flower for Bouquet
const BouquetFlower = ({ position, color }) => {
  const petalCount = 5;
  const petals = useMemo(() => {
    const temp = [];
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const x = Math.cos(angle) * 0.2;
      const y = Math.sin(angle) * 0.2;
      temp.push({ x, y });
    }
    return temp;
  }, []);

  return (
    <group position={position} scale={0.8}>
      {/* Flower center */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Petals */}
      {petals.map((petal, i) => (
        <mesh key={i} position={[petal.x, petal.y, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.2}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

const Bouquet = () => {
  const flowers = [
    { y: 2, color: '#ff6b9d' },
    { y: 1.5, color: '#ff69b4' },
    { y: 1, color: '#ffb6c1' },
    { y: 0.5, color: '#ffd700' },
    { y: 0, color: '#ff1493' },
    { y: -0.5, color: '#dc143c' },
    { y: -1, color: '#ff69b4' },
  ];

  return (
    <group position={[-5, -1, -1]}>
      {/* Main stem/base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 2, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Individual stems */}
      {flowers.map((flower, i) => (
        <mesh key={`stem-${i}`} position={[Math.sin(i * 0.3) * 0.3, flower.y - 0.3, Math.cos(i * 0.3) * 0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      ))}
      
      {/* 3D Flowers */}
      {flowers.map((flower, i) => (
        <BouquetFlower
          key={`flower-${i}`}
          position={[Math.sin(i * 0.3) * 0.3, flower.y, Math.cos(i * 0.3) * 0.2]}
          color={flower.color}
        />
      ))}
    </group>
  );
};

export default Bouquet;
