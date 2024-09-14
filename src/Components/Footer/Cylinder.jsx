// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { TextureLoader } from 'three';
// import { useLoader } from '@react-three/fiber';
// import { extend } from '@react-three/fiber';
// import * as THREE from 'three';

// extend({ PlaneBufferGeometry: THREE.PlaneBufferGeometry });

// const Cylinder = () => {
//   const images = [
//     '/company1.avif',
//     '/company2.avif',
//     '/company3.jpg',
//     '/company4.jpg',
//     '/company6.jpg',
//   ];

//   const textures = useLoader(TextureLoader, images);
//   const groupRef = useRef();

//   useFrame(() => {
//     groupRef.current.rotation.y += 0.01;
//   });

//   return (
//     <group ref={groupRef}>
//       {textures.map((texture, index) => (
//         <mesh key={index} position={[Math.cos((index / images.length) * Math.PI * 2) * 3, 0, Math.sin((index / images.length) * Math.PI * 2) * 3]}>
//           <planeBufferGeometry args={[1, 1]} />
//           <meshBasicMaterial map={texture} />
//         </mesh>
//       ))}
//     </group>
//   );
// };

// export default Cylinder;
