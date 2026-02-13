import React, { useMemo } from 'react';
import { Text, Float } from '@react-three/drei';

const TeddyBears = ({ count = 8 }) => {
  const bears = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Position bears on the sides (left and right)
      const side = i % 2 === 0 ? -1 : 1; // Alternate left/right
      const x = side * (6 + Math.random() * 2); // 6-8 units from center
      const y = (Math.random() - 0.5) * 8; // Spread vertically
      const z = -2 - Math.random() * 3; // Behind the heart
      const scale = 0.8 + Math.random() * 0.4; // Vary size
      temp.push({ x, y, z, scale });
    }
    return temp;
  }, [count]);

  return (
    <>
      {bears.map((bear, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.3} floatIntensity={0.5}>
          <Text
            position={[bear.x, bear.y, bear.z]}
            fontSize={bear.scale}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            🧸
          </Text>
        </Float>
      ))}
    </>
  );
};

export default TeddyBears;
