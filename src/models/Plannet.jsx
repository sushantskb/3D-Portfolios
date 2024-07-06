import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";
import plannetScene from "../assets/3d/plannet.glb";

const Plannet = (props) => {
  const plannetRef = useRef();

  const { nodes, materials } = useGLTF(plannetScene);

  return (
    <a.group ref={plannetRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-1.54, -0.064, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Clouds_1">
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.Clouds}
                />
              </group>
              <group name="Planet_2">
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials.Planet}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  );
};

export default Plannet;

// const group = useRef();
//   const { gl, viewport } = useThree();
//   const { nodes, materials, animations } = useGLTF(plannetScene);
//   const { actions } = useAnimations(animations, group);

//   const lastX = useRef(0);
//   const rotationSpeed = useRef(0);
//   const dampingFactor = 0.95;

//   const handlePointerDown = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setIsRotating(true);

//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;

//     lastX.current = clientX;
//   };

//   const handlePointerUp = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setIsRotating(false);
//   };

//   const handlePointerMove = (e) => {
//     e.stopPropagation();
//     e.preventDefault();

//     if (isRotating) {
//       const clientX = e.touches ? e.touches[0].clientX : e.clientX;

//       const delta = (clientX - lastX.current) / viewport.width;

//       group.current.rotation.y += delta * 0.01 * Math.PI;

//       lastX.current = clientX;

//       rotationSpeed.current = delta * 0.01 * Math.PI;
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'ArrowLeft') {
//       if (!isRotating) setIsRotating(true);
//       group.current.rotation.y += 0.01 * Math.PI;
//     } else if (e.key === 'ArrowRight') {
//       if (!isRotating) setIsRotating(true);
//       group.current.rotation.y -= 0.01 * Math.PI;
//     }
//   };

//   const handleKeyUp = (e) => {
//     if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
//       setIsRotating(false);
//     }
//   };

//   useFrame(() => {
//     if (!isRotating) {
//       rotationSpeed.current *= dampingFactor;

//       if (Math.abs(rotationSpeed.current) < 0.001) {
//         rotationSpeed.current = 0;
//       }

//       group.current.rotation.y += rotationSpeed.current;
//     } else {
//       const rotation = group.current.rotation.y;

//       const normalizedRotation =
//         ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

//       // Set the current stage based on the plannet's orientation
//       switch (true) {
//         case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
//           setCurrentStage(4);
//           break;
//         case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
//           setCurrentStage(3);
//           break;
//         case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
//           setCurrentStage(2);
//           break;
//         case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
//           setCurrentStage(1);
//           break;
//         default:
//           setCurrentStage(null);
//       }
//     }
//   });

//   useEffect(() => {
//     const canvas = gl.domElement;
//     canvas.addEventListener('pointerdown', handlePointerDown);
//     canvas.addEventListener('pointerup', handlePointerUp);
//     canvas.addEventListener('pointermove', handlePointerMove);
//     document.addEventListener('keydown', handleKeyDown);
//     document.addEventListener('keyup', handleKeyUp);

//     return () => {
//       canvas.removeEventListener('pointerdown', handlePointerDown);
//       canvas.removeEventListener('pointerup', handlePointerUp);
//       canvas.removeEventListener('pointermove', handlePointerMove);
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('keyup', handleKeyUp);
//     };
//   }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);
