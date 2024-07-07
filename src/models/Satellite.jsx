import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import satelliteScene from "../assets/3d/satellite.glb"
const Satellite = ({ planetPosition = [0, 0, 0], distance = 5, speed = 0.01 }) => {
  const { scene } = useGLTF(satelliteScene);
  const satelliteRef = useRef();
  const angleRef = useRef(0);

  useFrame(() => {
    angleRef.current += speed;
    const x = planetPosition[1] + distance * Math.cos(angleRef.current);
    const z = planetPosition[0] + distance * Math.sin(angleRef.current);
    satelliteRef.current.position.set(x, planetPosition[1], z);
    satelliteRef.current.rotation.y = angleRef.current + Math.PI / 2;
  });

  return (
    <mesh ref={satelliteRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Satellite;
