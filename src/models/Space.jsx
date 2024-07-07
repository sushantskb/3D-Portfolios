import React, { useRef } from "react";
import spaceScene from "../assets/3d/space_sky.glb";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
const Space = ({isRotating}) => {
  const space = useGLTF(spaceScene);
  const spaceRef = useRef();

  useFrame((_, delta) => {
    if (isRotating) {
      spaceRef.current.rotation.y += 0.15 * delta;
    }
  });
  return (
    <mesh ref={spaceRef}>
      <primitive object={space.scene} />
    </mesh>
  );
};

export default Space;
