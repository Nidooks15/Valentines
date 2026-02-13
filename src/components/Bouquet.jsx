import React from 'react';
import { Text } from '@react-three/drei';

const Bouquet = () => {
  const flowers = [
    { emoji: '🌹', y: 2, color: '#ff6b9d' },
    { emoji: '🌺', y: 1.5, color: '#ff69b4' },
    { emoji: '🌸', y: 1, color: '#ffb6c1' },
    { emoji: '🌻', y: 0.5, color: '#ffd700' },
    { emoji: '🌷', y: 0, color: '#ff1493' },
    { emoji: '🌹', y: -0.5, color: '#dc143c' },
    { emoji: '💐', y: -1, color: '#ff69b4' },
  ];

  return (
    <group position={[-5, -1, -1]}>
      {/* Stems/Base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 2, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Flowers */}
      {flowers.map((flower, i) => (
        <Text
          key={i}
          position={[Math.sin(i * 0.3) * 0.3, flower.y, Math.cos(i * 0.3) * 0.2]}
          fontSize={0.6}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {flower.emoji}
        </Text>
      ))}
    </group>
  );
};

export default Bouquet;
