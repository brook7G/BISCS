import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { TextureLoader } from "three";
import ImageOne from "../../../assets/Image20.jpeg";

const Box = () => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, ImageOne);
  const { camera, gl } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [rotationSpeed, setRotationSpeed] = useState({ x: 0.01, y: 0.01 }); // Set initial rotation speed

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x;
      meshRef.current.rotation.y += rotationSpeed.y;
    }
  });

  const handlePointerDown = (event) => {
    setIsDragging(true);
    setInitialMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - initialMousePosition.x;
      const deltaY = event.clientY - initialMousePosition.y;
      const newRotationSpeed = {
        x: deltaY / gl.domElement.clientHeight,
        y: deltaX / gl.domElement.clientWidth,
      };
      setRotationSpeed(newRotationSpeed);
      meshRef.current.rotation.y += newRotationSpeed.y;
      meshRef.current.rotation.x += newRotationSpeed.x;
      setInitialMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        map={texture}
        color={isHovered ? "#AAFF00" : "dodgerblue"}
      />
    </mesh>
  );
};

const Cube = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="dodgerblue" position={[0, 0, 5]} />
      <Box />
    </Canvas>
  );
};

export default Cube;
