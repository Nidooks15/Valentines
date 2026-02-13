import React, { useRef } from 'react';
import { OrbitControls, Stars, Environment, Float, Sparkles } from '@react-three/drei';
import Heart from './Heart';
import Flowers from './Flowers';
import TeddyBears from './TeddyBears';

const Experience = () => {
    return (
        <>
            {/* Camera Controls */}
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

            {/* Background */}
            <color attach="background" args={['#1a0b1a']} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#ffb6c1" />
            <Flowers count={30} />
            <TeddyBears count={8} />

            {/* Objects */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <Heart position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
            </Float>
        </>
    );
};

export default Experience;
