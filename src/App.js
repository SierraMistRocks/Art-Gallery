import React, { useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { SpotLight, Text, ScrollControls, Scroll, Html } from '@react-three/drei';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { TextureLoader, Vector3 } from 'three';
import data from './data.json';

const ART_PIECES = data;

const WallArt = ({ art, i, setSelectedArt }) => {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const gap = 4;
  const imageWidth = 3;
  const texture = useLoader(TextureLoader, art.imgPath);

  return (
    <group>
      <SpotLight
        className="spotlight"
        position={[(i + 1) * (imageWidth + gap) + (i + 1) - w / 4, 2.5, 1]}
        penumbra={1}
        angle={0.6}
        attenuation={1}
        anglePower={5}
        intensity={10}
        distance={10}
        castShadow
        color={0xffffff}
      />
      <mesh
        castShadow
        position={[(i + 1) * (imageWidth + gap) + (i + 1), 0, 0]}
        onClick={(event) => setSelectedArt(art)}
      >
        <boxBufferGeometry attach="geometry" args={[imageWidth, h / 2, 0.07]} />
        <meshStandardMaterial
          attach="material"
          map={texture}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[(i + 1) * (imageWidth + gap) + (i + 1), -2.5, 0]}>
        <planeGeometry args={[1.25, 0.5]} />
        <meshStandardMaterial color={0xFAEBD7} />
        <Text
          position-z={0}
          scale={[2, 2, 2]}
          color="black"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
          castShadow
        >
          {art.title}
        </Text>
        <Text
          position-z={-0.5}
          scale={[1.5, 1.5, 1.5]}
          color="#333"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
        >
          {art.quote}
        </Text>
      </mesh>
    </group>
  );
};

const Scene = () => {
  const { width: screenWidth } = useThree((state) => state.viewport);
  const textScale = screenWidth < 5.5 ? 2 : 4;
  const [selectedArt, setSelectedArt] = useState(null);

  return (
    <>
      <ScrollControls infinite horizontal damping={4} pages={39 * Math.exp(-0.11 * screenWidth)} distance={1}>
        <Scroll>
          {ART_PIECES.map((art, i) => (
            <WallArt key={i} art={art} i={i} setSelectedArt={setSelectedArt} />
          ))}
        </Scroll>
      </ScrollControls>
      {selectedArt && (
        <Html position={[0, 0, -2]} center>
          <div>
            <img src={selectedArt.imgPath} alt={selectedArt.title} style={{ maxWidth: '80vw', maxHeight: '80vh' }} />
            <p>{selectedArt.title}</p>
            <p>{selectedArt.quote}</p>
            <button onClick={() => setSelectedArt(null)}>Close</button>
          </div>
        </Html>
      )}
    </>
  );
};

const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new Vector3();
  return useFrame(() => camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, camera.position.z), 0.2));
};

function App() {
  return (
    <Canvas shadows camera>
      <ambientLight intensity={0.6} color={0xffffff} />
      <mesh position={[0, 0, -0.1]} receiveShadow>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color={0x000000} />
      </mesh>
      <Scene />
      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
      <Rig />
    </Canvas>
  );
}

export default App;
