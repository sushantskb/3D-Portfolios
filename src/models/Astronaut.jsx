import React, { useEffect, useRef } from "react";
import astronautScene from "../assets/3d/astronaut.glb";
import { useAnimations, useGLTF } from "@react-three/drei";

const Astronaut = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(astronautScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    // Detailed logging of the loaded GLTF data
    // console.log("Loaded scene:", scene);
    // console.log("Loaded animations:", animations);
    // console.log("Available actions:", actions);

    // Verify if animations object contains any data
    if (!animations || animations.length === 0) {
      console.error("No animations found in the GLTF file.");
      return;
    }

    // Use the correct animation name
    const animationAction = actions["2186256603392_TempMotion"];

    if (!animationAction) {
      console.error("Animation '2186256603392_TempMotion' not found in actions.");
      return;
    }

    // Play or stop the animation based on the isRotating prop
    if (isRotating) {
      animationAction.play();
    } else {
      animationAction.stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Astronaut;
