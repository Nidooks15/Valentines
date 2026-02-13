import React, { useMemo } from 'react';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const Flowers = ({ count = 30 }) => {
  const flowers = useMemo(() => {
    const temp = [];
    const emojis = ['🌸', '🌹', '🌻', '🌷', '🌺', '💖'];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10 - 2; // Keep them mostly behind or around
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const scale = Math.random() * 0.5 + 0.5;
      temp.push({ x, y, z, emoji, scale });
    }
    return temp;
  }, [count]);

  return (
    <>
      {flowers.map((flower, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={1}>
          <Text
            position={[flower.x, flower.y, flower.z]}
            fontSize={flower.scale}
            color="white" // Emojis rely on the font, color might tint it but usually standard emojis ignore this or need specific handling. 
            // However, R3F Text showing emojis might appear as flat colors or black/white depending on the font.
            // Let's rely on the system font which should support emojis.
            anchorX="center"
            anchorY="middle"
          >
            {flower.emoji}
          </Text>
        </Float>
      ))}
    </>
  );
};

export default Flowers;
