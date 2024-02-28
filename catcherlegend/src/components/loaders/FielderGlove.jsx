import React, { useRef, useMemo } from 'react'
import { useGLTF,  useTexture, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MeshWithTexture = ({ geometry, material, color, position, rotation, scale, texture, tsize=9.25 }) => {
  const textureMap = useTexture(texture);
  const map = useMemo(() => {
    const map = textureMap.clone() 
    map.repeat.set(tsize, tsize)
    map.wrapS = THREE.RepeatWrapping 
    map.wrapT = THREE.RepeatWrapping  
    return map
  }, [textureMap, tsize])
  return (
    <>
    <mesh geometry={geometry} material={material} material-color={color} position={position} rotation={rotation} scale={scale} >
      <meshBasicMaterial map={map} />
    </mesh> 
    </>
  );
};


export function New({rot, base, colors, personalize, personalizeConfig, xPosition, yPosition, zPosition, xRotation, yRotation, zRotation, textures }) {
  const { nodes, materials } = useGLTF("/wp-content/reactpress/apps/catcherlegend/build/Model/catcher1.glb")
  
  console.log(textures)

  const ref = useRef();
  
  useFrame(() => {
    ref.current.rotation.y = rot
    ref.current.rotation.z = 0.2
  })

  const matBinding = materials.VRayMtl7.clone();
  const matCrown = materials.VRayMtl7.clone();
  const matLaces= materials.VRayMtl7.clone();
  const matLaces1= materials.VRayMtl1.clone();
  const matleather1= materials.VRayMtl7.clone();
  const matStitches= materials.VRayMtl7.clone();
  const matPalm= materials.VRayMtl7.clone();
  const matWrist= materials.VRayMtl7.clone();
  const matWeb= materials.VRayMtl7.clone();
  const matGuard= materials.lambert1.clone();
  const matLogoOutline= materials.pasted__logo_without_outline_fr.clone();
  const matPad= materials.lambert1.clone();
  const matHood= materials.lambert1.clone();
  
  const { viewport } = useThree();
  const width = viewport.width;
  const minWidth = 2.835;
  const maxWidth = 6.75;
  const scaleFactor = (20 - 10) / (maxWidth - minWidth);
  const positionFactor = (2.1 - 1.05) / (maxWidth - minWidth);
  const scale = 10 + (width - minWidth) * scaleFactor;
  const position = 1.05 + (width - minWidth) * positionFactor;

  return (
    <group dispose={null} position={[rot === 0 ? 0.6 : rot === 2* (-Math.PI / 2) ? -0.6: 0, -4.5, 0]} scale={[scale, scale, scale]} ref={ref}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {base.finger_hood_or_pad === "Pad" && (
          <mesh geometry={nodes.pasted__polySurface1.geometry} material-color={colors["Finger Pad"]} material={matPad} />
        )}

        {base.finger_hood_or_pad === "Hood" && (
          <mesh geometry={nodes.pasted__polySurface2.geometry} material-color={colors["Finger Hood"]} material={matHood} />
        )}

        {/*Wrist Guard*/}
        {base["Wrist Guard"] &&  (
          <>
            <mesh geometry={nodes.Mesh002.geometry} material-color={colors["Wrist Guard"]} material={matGuard} />
            <mesh geometry={nodes.Mesh002_1.geometry} material-color={colors["Logo"]} material={materials.pasted__logo_without_outline_fr} />
          </>
        )}

      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Back Upper Logo*/}
        <group position={[41.558, 7.027, -16.35]} rotation={[-2.442, 1.336, 3.113]} scale={1.4}>
          <mesh geometry={nodes.logo_backup1001.geometry} material-color={colors["Logo"]} material={materials.pasted__logo_without_outline_fr} />
          <mesh geometry={nodes.polySurface111001.geometry} material-color={"#fefefe"} material={materials.blinn13} /> {/*Logo back */}
          {/*Outer Lines */}
          <mesh geometry={nodes.polySurface112001.geometry} material-color={"#fefefe"} material={materials.blinn11} />
          <mesh geometry={nodes.polySurface115001.geometry} material-color={"#fefefe"} material={materials.blinn11} />
          {/*Inner Lines */}
          <mesh geometry={nodes.polySurface113001.geometry} material-color={"#fefefe"} material={materials.blinn12} />
          <mesh geometry={nodes.polySurface114001.geometry} material-color={"#fefefe"} material={materials.blinn12} />
        </group>

        {base.wrist_logo === "Embroidered" && (
          <>
          <mesh geometry={nodes.logo001.geometry} material-color={colors["Logo"]} material={materials.pasted__logo_without_outline_fr} />
          {base.logo_outline === "Enable Logo Outline" && (
            <mesh geometry={nodes.polySurface120001.geometry} material-color={colors.logo_outline_color} material={matLogoOutline} />
          )}
          </>
        )}
        
        {/*Circle Logo*/}
        {base.wrist_logo === "Circle Patch" && (
          <>
            <mesh geometry={nodes.logo_backup.geometry} material-color={colors["Logo"]} material={materials.pasted__logo_without_outline_fr} position={[0.851, 2.603, 2.981]} rotation={[-0.058, 0.045, -0.048]} scale={1.235} />
            {/*Logo Back*/}
            <mesh geometry={nodes.polySurface110.geometry} material-color={colors.wristPlate} material={materials.blinn16} />
            {/*Logo Stitches*/}
            <mesh geometry={nodes.MASH16_ReproMesh.geometry} material-color={colors.Stitches} material={materials.blinn17} />
            {/*DK*/}
            <mesh geometry={nodes.pCylinder29.geometry} material-color={"#fefefe"} material={materials.lambert1} />
          </>
        )}
        {/* <mesh geometry={nodes.polySurface117001.geometry} material-color={"#fefefe"} material={materials.blinn15} /> */}

        {/*Square Logo*/}
        {base.wrist_logo === "Square Patch" && (
          <>
            <mesh geometry={nodes.logo_backup1.geometry} material-color={colors["Logo"]} material={materials.pasted__logo_without_outline_fr} position={[0.486, 1.025, -1.894]} rotation={[-0.058, 0.045, -0.048]} scale={0.921} />
            <mesh geometry={nodes.polySurface111.geometry} material-color={"#fefefe"} material={materials.blinn13} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
            <mesh geometry={nodes.polySurface113.geometry} material-color={"#fefefe"} material={materials.blinn12} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
            <mesh geometry={nodes.polySurface114.geometry} material-color={"#fefefe"} material={materials.blinn12} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
            <mesh geometry={nodes.polySurface112.geometry} material-color={"#fefefe"} material={materials.blinn11} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
            <mesh geometry={nodes.polySurface115.geometry} material-color={"#fefefe"} material={materials.blinn11} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
          </>
        )}
      </group>
      {/*Binding*/}
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.sweep1.geometry} material-color={colors.binding} material={matBinding} />
        <mesh geometry={nodes.sweep3.geometry} material-color={colors.binding} material={matBinding} />
        <mesh geometry={nodes.sweep6.geometry} material-color={colors.binding} material={matBinding} />
        <mesh geometry={nodes.sweep7.geometry} material-color={colors.binding} material={matBinding} />
      </group>

      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Palm*/}
        {textures.palm }
        <mesh geometry={nodes.polySurface19.geometry} material-color={colors.palm} material={matPalm} />
        
        {/*Leather1*/}
        <mesh geometry={nodes.polySurface6.geometry} material-color={colors.leather1} material={matleather1} />
        <mesh geometry={nodes.polySurface7.geometry} material-color={colors.leather1} material={matleather1} />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Wrist*/}
        <mesh geometry={nodes.polySurface108.geometry} material-color={colors.wrist} material={materials['VRayMtl7.002']} />
        
        {/*leather1*/}
        {textures.leather1 != null ? (
          <MeshWithTexture geometry={nodes.polySurface9.geometry} material-color={colors.leather1} material={materials['VRayMtl7.001']} texture={textures.leather1}/>
        ): (
          <mesh geometry={nodes.polySurface9.geometry} material-color={colors.leather1} material={materials['VRayMtl7.001']} />
        )}
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Laces*/}
        <mesh geometry={nodes.Mesh033.geometry} material-color={colors.laces} material={matLaces} />
        <mesh geometry={nodes.Mesh033_1.geometry} material-color={colors.laces} material={matLaces1} />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Stiches*/}
        <mesh geometry={nodes.Mesh034.geometry} material-color={colors.Stitches} material={materials.lambert1} />
        <mesh geometry={nodes.Mesh034_1.geometry} material-color={colors.Stitches} material={matStitches} />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Palm*/}
        <mesh geometry={nodes.Mesh036.geometry} material-color={colors.palm} material={matPalm} />
        <mesh geometry={nodes.Mesh036_1.geometry} material-color={colors["Logo"]} material={materials.pasted__logo_without_outline_fr} />
      </group>
      {/*Crown*/}
      <mesh geometry={nodes.polySurface10.geometry} material-color={colors["Crown"]} material={matCrown} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      {/*WebStyle*/}
      <mesh geometry={nodes.polySurface14.geometry} material-color={colors.web} material={matWeb} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
    </group>
  )
}

useGLTF.preload("/wp-content/reactpress/apps/catcherlegend/build/Model/catcher.glb")