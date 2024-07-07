import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Plannet from "../models/Plannet";
import Space from "../models/Space";
import Satellite from "../models/Satellite";
import Astronaut from "../models/Astronaut";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const planetPosition = [0, -1.5, -10];

  const adjustPlannetForScreenSize = () => {
    let screenScale = [6.5, 6.5, 6.5]; // Increased scale
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [1.8, 1.8, 1.8]; // Adjust scale for mobile
    }
    return [screenScale, planetPosition, rotation];
  };

  const adjustAstronautForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.8, 1.8, 1.8]; // Adjust scale for mobile
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };

  const [plannetScale, , plannetRotation] = adjustPlannetForScreenSize();
  const [astronautScale, astronautPostion] = adjustAstronautForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ position: [0, 0, 10], near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[0.1, 0.1, 0]} intensity={2} />
          <ambientLight intensity={5} />
          <hemisphereLight skyColor="#152026" groundColor="#000000" />
          <Space isRotating={isRotating} />
          <Plannet
            position={planetPosition}
            scale={plannetScale}
            rotation={plannetRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Satellite
            planetPosition={planetPosition}
            distance={7} // Adjust the distance from the planet
            speed={0.01} // Adjust the speed of orbit
          />
          <Astronaut
            isRotating={isRotating}
            astronautScale={astronautScale}
            astronautPostion={astronautPostion}
            rotation={[1, 20.1, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;




// --Backup--
// import { Canvas } from "@react-three/fiber";
// import { Suspense, useState } from "react";
// import Loader from "../components/Loader";

// import Island from "../models/Island";
// import Plane from "../models/Plane";
// import Bird from "../models/Bird";
// import Sky from "../models/Sky";
// import HomeInfo from "../components/HomeInfo";

// const Home = () => {
//   const [isRotating, setIsRotating] = useState(false);
//   const [currentStage, setCurrentStage] = useState(1);

//   const adjustIslandForScreenSize = () => {
//     let screenScale = null;
//     let screenPosition = [0, -6.5, -43];
//     let rotation = [0.1, 4.7, 0];

//     if (window.innerWidth < 768) {
//       screenScale = [0.9, 0.9, 0.9];
//     } else {
//       screenScale = [1, 1, 1];
//     }
//     return [screenScale, screenPosition, rotation];
//   };
//   const adjustPlaneForScreenSize = () => {
//     let screenScale, screenPosition;

//     if (window.innerWidth < 768) {
//       screenScale = [1.5, 1.5, 1.5];
//       screenPosition = [0, -1.5, 0];
//     } else {
//       screenScale = [3, 3, 3];
//       screenPosition = [0, -4, -4];
//     }
//     return [screenScale, screenPosition];
//   };

//   const [islandScale, islandPosition, islandRoation] =
//     adjustIslandForScreenSize();
//   const [planeScale, planePosition] = adjustPlaneForScreenSize();
//   return (
//     <section className="w-full h-screen relative">
//       <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
//         {currentStage && <HomeInfo currentStage={currentStage} />}
//       </div>
//       <Canvas
//         className={`w-full h-screen bg-transparent ${
//           isRotating ? "cursor-grabbing" : "cursor-grab"
//         }`}
//         camera={{ near: 0.1, far: 1000 }}
//       >
//         <Suspense fallback={<Loader />}>
//           <directionalLight position={[1, 1, 1]} intensity={2} />
//           <ambientLight intensity={0.5} />
//           <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" />
//           <Bird />
//           <Sky isRotating={isRotating} />
//           <Island
//             position={islandPosition}
//             scale={islandScale}
//             rotation={islandRoation}
//             isRotating={isRotating}
//             setIsRotating={setIsRotating}
//             setCurrentStage={setCurrentStage}
//           />
//           <Plane
//             isRotating={isRotating}
//             planeScale={planeScale}
//             planePosition={planePosition}
//             rotation={[0, 20, 0]}
//           />
//         </Suspense>
//       </Canvas>
//     </section>
//   );
// };

// export default Home;
