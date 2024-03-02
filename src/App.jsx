/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { CameraControls } from "@react-three/drei";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 3, ...props }));
  const [color, setColor] = useState("white");

  const changeColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <mesh {...props} ref={ref} onClick={changeColor}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function App() {
  const figuresCount = Math.floor(Math.random() * 8) + 3;
  let figures = [];
  for (let i = 0; i < figuresCount; i++) {
    figures.push(
      <Cube
        position={[
          Math.floor(Math.random() * 4),
          Math.floor(Math.random() * 10) + 5,
          0,
        ]}
      />
    );
  }

  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [-5, 5, 5], fov: 50 }}>
      <CameraControls makeDefault />
      <ambientLight />
      <spotLight
        angle={0.6}
        penumbra={0.5}
        position={[30, 20, 5]}
        castShadow
        intensity={6000}
      />
      <Physics>
        <Plane />
        {figures}
      </Physics>
    </Canvas>
  );
}
