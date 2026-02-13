import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Experience from './components/Experience';
import Overlay from './components/Overlay';
import './index.css';

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100vw', height: '100vh', background: '#1a0b1a' }}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Loader />
      <Overlay />
    </>
  );
}

export default App;
