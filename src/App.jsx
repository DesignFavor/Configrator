import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

function House() {
  const { scene } = useGLTF('/model/house.glb');
  scene.traverse((node) => {
    if (node.isMesh) node.castShadow = true;
  });
  return <primitive object={scene} />;
}

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [5, 5, 5], fov: 50 }} // Perspective camera with fov and position
    >
      {/* Ambient and directional lights */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={2048}
        shadow-bias={-0.0001}
      />

      {/* Environment setup */}
      <Environment files="/envy.hdr" background={false} />

      {/* Orbit Controls */}
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial transparent opacity={0.5} />
      </mesh>

      {/* House Model */}
      <House />
    </Canvas>
  );
}
