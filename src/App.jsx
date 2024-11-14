"use client";

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function House() {
  const { scene } = useGLTF('/public/model/house.glb');
  scene.traverse((node) => {
    if (node.isMesh) node.castShadow = true;
  });
  return <primitive object={scene} />;
}

function Ground() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.2} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas
      shadows
      style={{ background: 'white' }} // Set the canvas background to white
      camera={{ position: [5, 5, 5], fov: 50 }}
    >
      <Suspense fallback={null}>
        <Environment files="/public/envy.hdr" background={false} />
        <House />
        <Ground />
        <OrbitControls />
      </Suspense>

      {/* Add directional light for shadows */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </Canvas>
  );
}
