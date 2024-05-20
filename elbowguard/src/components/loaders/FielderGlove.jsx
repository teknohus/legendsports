import React, { useRef, useMemo } from 'react'
import { useGLTF,  useTexture, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { thumb_graphics, thumb_premium_graphics, stamp_flags, stamp_palm, fonts, back_flags, LegendHorse } from "../constants"
import Outlinefont from "../../assets/fonts/Milestone Outline.otf"

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

const ThumbGraphic = ({ nodes, materials, position, rotation, scale, personalize}) => {
  const graphicTexture = useTexture(thumb_graphics[personalize['Thumb Graphic']]);
  graphicTexture.encoding = THREE.sRGBEncoding;
  materials.cross.map = graphicTexture

  return (
    <mesh geometry={nodes.cross.geometry} material={materials.cross} position={position} rotation={rotation} scale={scale} />
   );
};

const ThumbPremiumGraphic = ({ nodes, materials, position, rotation, scale, personalize}) => {
  const graphicTexture = useTexture(thumb_premium_graphics[personalize['Premium Graphic']]);
  graphicTexture.encoding = THREE.sRGBEncoding;
  materials.cross.map = graphicTexture

  if(personalize['Premium Graphic'] === "Banana"){
    scale = [0.0482, 0.025, 0.0482]
  }
  if(personalize['Premium Graphic'] === "Tween Treasure"){
    scale = [0.0512, 0.025, 0.0314]
  }
  if(personalize['Premium Graphic'] === "Champion"){
    scale = [0.0483, 0.025, 0.0318]
  }

  return (
     <mesh geometry={nodes.cross.geometry} material={materials.cross} material-color={"#D1D3D0"} position={position} rotation={rotation} scale={scale}  /> 
  );
};
const StampedFlag = ({ nodes, materials, position, rotation, scale, personalize }) => {
  
  const graphicTexture = useTexture(stamp_flags[personalize['Stamped Flag']]);
  graphicTexture.encoding = THREE.sRGBEncoding;
  const Copy =  materials.cross.clone();
  Copy.map = graphicTexture

  return (
    <mesh geometry={nodes.cross.geometry} material-color={"#18191A"} material={Copy} position={position} rotation={rotation} scale={scale} />
  );
};

const PalmGraphic = ({ nodes, materials, position, rotation, scale, personalize }) => {
  const graphicTexture = useTexture(stamp_palm[personalize['Palm Graphic']]);
  graphicTexture.encoding = THREE.sRGBEncoding;
  const Copy =  materials.cross.clone();
  Copy.map = graphicTexture

  return (
    <mesh geometry={nodes.cross.geometry} material={Copy} position={position} rotation={rotation} scale={scale} />
  );
};
const PalmStamp = ({ nodes, materials, position, rotation, scale, personalize }) => {
  const graphicTexture = useTexture(LegendHorse);
  graphicTexture.encoding = THREE.sRGBEncoding;
  const Copy =  materials.cross.clone();
  Copy.map = graphicTexture

  return (
    <mesh geometry={nodes.cross.geometry} material={Copy} position={position} rotation={rotation} scale={scale} />
  );
};


const BackFlag = ({ nodes, materials, position, rotation, scale, personalize }) => {
  const graphicTexture = useTexture(back_flags[personalize['Flag']]);
  graphicTexture.encoding = THREE.sRGBEncoding;
  const Copy =  materials.cross.clone();
  Copy.map = graphicTexture

  return (
    <mesh  geometry={nodes.cross.geometry} material={Copy} position={position} rotation={rotation} scale={scale} />
  );
};

export function New({rot, base, colors, personalize, personalizeConfig, xPosition, yPosition, zPosition, xRotation, yRotation, zRotation, textures }) {
  const { nodes, materials } = useGLTF("/wp-content/reactpress/apps/elbowguard/build/Model/untitled.glb")

  const ref = useRef();

  const pos0 = 0;
  const pos1 = 1 * (-Math.PI / 2);
  
  useFrame(() => {
    if (rot === pos1) {
      ref.current.rotation.z = 0
      ref.current.rotation.x = Math.PI / 2
    }
    else if (rot === pos0) {
      ref.current.rotation.z = Math.PI
      ref.current.rotation.x = Math.PI / 2
    }
  })

  
  const matback = materials.elbowstich.clone()
  const matback1 = materials.ElbowGuard.clone()
  
  
  const { viewport } = useThree();
  const width = viewport.width;
  const minWidth = 2.25;
  const maxWidth = 6.75;

  const scaleFactor = (20 - 6) / (maxWidth - minWidth);
  const scale = 6 + (width - minWidth) * scaleFactor;
  const pos0xFactor = (2.5 - 0.8) / (maxWidth - minWidth)
  const pos0yFactor = (3.5 - 1.4) / (maxWidth - minWidth)
  const scaledPos0x = 0.8 + (width - minWidth) * pos0xFactor
  const scaledPos0y = 1.4 + (width - minWidth) * pos0yFactor
  const pos1xFactor = (3.5 - 1) / (maxWidth - minWidth)
  const pos1yFactor = (0.5 - 0) / (maxWidth - minWidth)
  const scaledPos1x = 1 + (width - minWidth) * pos1xFactor
  const scaledPos1y = 0 + (width - minWidth) * pos1yFactor
  const pos2xFactor = (2 - 0.5) / (maxWidth - minWidth)
  const scaledPos2x = 0.5 + (width - minWidth) * pos2xFactor


  return (
    <group dispose={null} ref={ref}>
      <mesh geometry={nodes.Elbow_strap.geometry} material-color={colors["Elbow Strap"]} material={materials.Elbow_Strap} />
      <mesh geometry={nodes.ArmStrap.geometry} material-color={colors["Arm Strap"]} material={materials.ArmStrap} />
      <mesh geometry={nodes.ElbowBindin.geometry} material-color={colors["Elbow Binding"]} material={materials.ElbowBinding} />
      <mesh geometry={nodes.Elbow_plate.geometry} material-color={colors["Elbow Plate"]} material={materials.Elbow_plate} />
      <mesh geometry={nodes.elbowstich.geometry} material-color={colors["Elbow Stitch"]} material={materials.elbowstich} />
      <mesh geometry={nodes.logo.geometry} material-color={colors["Logo"]} material={materials.Logo} />
      <mesh geometry={nodes.armPlate.geometry} material-color={colors["Arm Plate"]} material={materials.ArmPlate} />
      <mesh geometry={nodes.arm_stich.geometry} material-color={colors["Arm Stitch"]} material={materials['armstich.001']} />
      <mesh geometry={nodes.armStich.geometry} material-color={colors["Arm Stitch"]} material={materials.armStiches} />
      <mesh geometry={nodes.arm_pad.geometry} material-color={colors["Arm Pad"]} material={materials.armPad} />
      <mesh geometry={nodes.ArmBinding.geometry} material-color={colors["Arm Binding"]} material={materials.ArmBinding} />
      <mesh geometry={nodes.Elbow_Guard.geometry} material-color={colors["Elbow Guard"]} material={materials.ElbowGuard} />
      <mesh geometry={nodes.Plane020.geometry} material-color={"#000"} material={materials.ElbowGuard} />
      <mesh geometry={nodes.Plane020_1.geometry} material-color={"#000"} material={matback} />
    </group>
  )
}

useGLTF.preload("/wp-content/reactpress/apps/elbowguard/build/Model/untitled.glb")