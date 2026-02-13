import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Heart = (props) => {
  const meshRef = useRef();

  // Create the heart shape
  const x = 0, y = 0;
  const heartShape = new THREE.Shape();
  heartShape.moveTo(x + 0.5, y + 0.5);
  heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
  heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
  heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
  heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
  heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
  heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

  const extrudeSettings = {
    steps: 2,
    depth: 0.4, // Thickness of the heart
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 2,
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Beating animation: scale up and down
    const scale = 1 + Math.sin(time * 3) * 0.1; 
    if (meshRef.current) {
        meshRef.current.scale.set(scale, scale, scale);
        // Gentle floating rotation
        meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group {...props}>
      <mesh ref={meshRef} rotation={[Math.PI, 0, 0]}> {/* Flip it so it's upright */}
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshStandardMaterial 
            color="#ff4d6d" 
            emissive="#ff0000"
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default Heart;
