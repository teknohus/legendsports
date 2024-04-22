import React, { useRef, useMemo } from 'react'
import { useGLTF,  useTexture, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { flags } from "../constants";
import { thumb_graphics, thumb_premium_graphics, stamp_flags, stamp_palm, fonts, back_flags, LegendLogo, LegendHorse } from "../constants"
import Outlinefont from "../../assets/fonts/Milestone Outline.otf"
import goldshiny from '../../assets/textures/gold shiny/MetalGoldPaint002_COL_1K_METALNESS.png'
import silvershiny from '../../assets/textures/silver shiny/base_base_BaseColor.png'
import redshiny from '../../assets/textures/red shiny/base_base_BaseColor.png'
import blueshiny from '../../assets/textures/blue shiny/base_base_BaseColor.png'


export function New({rot, base, colors, personalize, personalizeConfig, xPosition, yPosition, zPosition, xRotation, yRotation, zRotation, textures }) {
  const ref = useRef();

  const { nodes, materials } = useGLTF("/wp-content/reactpress/apps/infieldcb44/build/Model/cb44.glb")

  for (const materialName in materials) {
    materials[materialName].metalness = 0;
    materials[materialName].roughness = 0.5; 
  }

  useFrame(() => {
    ref.current.rotation.y = rot
  })

  const { viewport } = useThree();
  const width = viewport.width;
  const minWidth = 2.835;
  const maxWidth = 6.75;
  const scaleFactor = (10 - 5) / (maxWidth - minWidth);
  const positionxFactor = (0.5 - 0.25) / (maxWidth - minWidth);
  const positionyFactor = (2 - 1) / (maxWidth - minWidth);
  const scale = 5 + (width - minWidth) * scaleFactor;
  const positionx = 0.25 + (width - minWidth) * positionxFactor;
  const positiony = 1 + (width - minWidth) * positionyFactor;

  return (
    <group dispose={null} position={[positionx, -1*positiony, 0]} scale={[scale, scale, scale]} ref={ref}>
      <mesh geometry={nodes.belt_top_ring.geometry} material-color={"#ffffff"} material={materials.initialShadingGroup} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.belt.geometry} material-color={"#ffffff"} material={materials['asdfasdf:initialShadingGroup_003']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.pinky_part.geometry} material-color={colors.wingtipPinky} material={materials.blinn7SG} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.welting.geometry} material-color={colors.welt} material={materials['initialShadingGroup.001']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.binding.geometry} material-color={colors.binding} material={materials.blinn4SG} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.spagetti.geometry} material-color={colors.laces} material={materials['initialShadingGroup.002']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.middle_part.geometry} material-color={colors.leather2} material={materials.blinn5SG} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.ring_part.geometry} material-color={colors.leather3} material={materials.blinn6SG} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.index_thumb_web.geometry} material-color={colors.leather1} material={materials.huerta_Default_OBJ} rotation={[Math.PI / 2, 0, 0]} />
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.laces_1.geometry} material-color={colors.laces} material={materials.blinn3SG} />
        <mesh geometry={nodes.laces_2.geometry} material-color={colors.laces} material={materials['initialShadingGroup.003']} />
      </group>
    </group>
  )
}

useGLTF.preload("/wp-content/reactpress/apps/infieldcb44/build/Model/cb44.glb")