import React, { useRef, useMemo } from 'react'
import { useGLTF,  useTexture, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import blackmesh from '../../assets/textures/black.jpg'
import { thumb_graphics, thumb_premium_graphics, stamp_flags, LegendLogo, stamp_palm, fonts, back_flags, LegendHorse } from "../constants"
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
  materials.Graphic.map = graphicTexture

  return (
    //  <mesh geometry={nodes.cross.geometry} material={materials.Graphic} position={[-0.07, 0.207, 0.022]} rotation={[0.131, -0.422, -1.208]} scale={0.05} />
     <mesh geometry={nodes.cross.geometry} material={materials.Graphic} material-color={"#D1D3D0"} position={position} rotation={rotation} scale={scale}  />
    //  <mesh geometry={nodes.shaka.geometry} material={materials.shaka} material-color={"#D1D3D0"} position={position} rotation={rotation} scale={scale} /> 
  );
};
const ThumbPremiumGraphic = ({ nodes, materials, position, rotation, scale, personalize}) => {
  const graphicTexture = useTexture(thumb_premium_graphics[personalize['Premium Graphic']]);
  graphicTexture.encoding = THREE.sRGBEncoding;
  materials.Graphic.map = graphicTexture

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
    //  <mesh geometry={nodes.cross.geometry} material={materials.Graphic} position={[-0.07, 0.207, 0.022]} rotation={[0.131, -0.422, -1.208]} scale={0.05} />
     <mesh geometry={nodes.cross.geometry} material={materials.Graphic} material-color={"#D1D3D0"} position={position} rotation={rotation} scale={scale}  />
    //  <mesh geometry={nodes.shaka.geometry} material={materials.shaka} material-color={"#D1D3D0"} position={position} rotation={rotation} scale={scale} /> 
  );
};
const StampedFlag = ({ nodes, materials, position, rotation, scale, personalize }) => {
  
  const graphicTexture = useTexture(stamp_flags[personalize['Stamped Flag']]);
  graphicTexture.encoding = THREE.sRGBEncoding;
  const Copy =  materials.Graphic.clone();
  Copy.map = graphicTexture

  return (
    <mesh geometry={nodes.cross.geometry} material-color={"#18191A"} material={Copy} position={position} rotation={rotation} scale={scale} />
  );
};

const PalmGraphic = ({ nodes, materials, position, rotation, scale, personalize }) => {
  const graphicTexture = useTexture(stamp_palm[personalize['Palm Graphic']]);
  graphicTexture.encoding = THREE.sRGBEncoding;
  const Copy =  materials.Graphic.clone();
  Copy.map = graphicTexture

  return (
    <mesh geometry={nodes.cross.geometry} material={Copy} position={position} rotation={rotation} scale={scale} />
  );
};
const PalmText = ({ nodes, materials, position, rotation, scale, personalize }) => {
  // const graphicTexture = useTexture(LegendLogo);
  const graphicTexture = useTexture(LegendHorse);
  graphicTexture.encoding = THREE.sRGBEncoding;
  const Copy =  materials.Graphic.clone();
  Copy.map = graphicTexture

  return (
    <mesh geometry={nodes.cross.geometry} material={Copy} position={position} rotation={rotation} scale={scale} />
  );
};


const BackFlag = ({ nodes, materials, position, rotation, scale, personalize }) => {
  const graphicTexture = useTexture(back_flags[personalize['Flag']]);
  graphicTexture.encoding = THREE.sRGBEncoding;
  const Copy =  materials.Graphic.clone();
  Copy.map = graphicTexture

  return (
    <mesh  geometry={nodes.cross.geometry} material={Copy} position={position} rotation={rotation} scale={scale} />
  );
};

export function New({rot, base, colors, personalize, personalizeConfig, xPosition, yPosition, zPosition, xRotation, yRotation, zRotation, textures }) {
  const { nodes, materials } = useGLTF("/wp-content/reactpress/apps/catcherminimitt/build/Model/catcher3.glb")

  const ref = useRef();
  const pos0 = 0;
  const pos1 = 1 * (-Math.PI / 2);
  const pos2 = 2 * (-Math.PI / 2);
  
  useFrame(() => {
    ref.current.rotation.y = rot
    if (rot === pos2){
      ref.current.rotation.z = pos1
      ref.current.rotation.x = pos1
    }
    else if(rot === pos1){
      ref.current.rotation.y = pos2
      ref.current.rotation.z = 0.2
    }
    else{
      ref.current.rotation.z = 0.2
    }
  })

  // const matBinding = materials.VRayMtl7.clone();
  // const matCrown = materials.VRayMtl7.clone();
  // const matLaces= materials.VRayMtl7.clone();
  // const matLaces1= materials.VRayMtl1.clone();
  // const matleather1= materials.VRayMtl7.clone();
  // const matStitches= materials.VRayMtl7.clone();
  // const matPalm= materials.VRayMtl7.clone();
  // const matWrist= materials.VRayMtl7.clone();
  // const matWeb= materials.VRayMtl7.clone();
  const matGuard= materials.lambert1.clone();
  const matLogoOutline= materials.pasted__logo_without_outline_fr.clone();
  const matInnerLines= materials.blinn11.clone();
  const matOuterLines= materials.blinn12.clone();
  // const matPad= materials.lambert1.clone();
  // const matHood= materials.lambert1.clone();
  
  const { viewport } = useThree();
  const width = viewport.width;
  const minWidth = 2.25;
  const maxWidth = 6.75;

  const scaleFactor = useMemo(() => {
    return (20 - 6) / (maxWidth - minWidth);
  }, []);

  const position0xFactor = useMemo(() => {
    return (0.6 - 0.2) / (maxWidth - minWidth);
  }, []);

  const position0yFactor = useMemo(() => {
    return (4.5 - 1.6) / (maxWidth - minWidth);
  }, []);

  const position2xFactor = useMemo(() => {
    return (4.8 - 1.4) / (maxWidth - minWidth);
  }, []);

  const scaledScale = useMemo(() => {
    const scale = 6 + (width - minWidth) * scaleFactor;
    return [scale, scale, scale];
  }, [width, scaleFactor]);

  const scaledXPosition = useMemo(() => {
    const position0_x = 0.2 + (width - minWidth) * position0xFactor;
    const position2_x = 1.4 + (width - minWidth) * position2xFactor;
    return rot === pos0 ? position0_x : rot === pos1 ? -position0_x : position2_x;
  }, [width, rot, position0xFactor, position2xFactor, pos1]);

  const scaledYPosition = useMemo(() => {
    const position0_y = 1.6 + (width - minWidth) * position0yFactor;
    return rot === pos0 || rot === pos1 ? -position0_y : 0;
  }, [width, rot, position0yFactor, pos1]);


  return (
    <group dispose={null} position={[scaledXPosition, scaledYPosition, 0]} scale={scaledScale} ref={ref}>
      {personalize["Thumb Logo/Graphic"] === "Graphic (+$7)" && (
        <ThumbGraphic nodes={nodes} materials={materials} position={[-0.052, 0.181, 0.006]} rotation={[Math.PI*-1, Math.PI*0.09375, Math.PI*-0.61425]} scale={[0.035, 0.025, 0.021]} personalize={personalize}/>
      )}
      {personalize["Thumb Logo/Graphic"] === "Premium Graphic (+$15)" && (
        <ThumbPremiumGraphic nodes={nodes} materials={materials} position={[-0.052, 0.181, 0.006]} rotation={[Math.PI*-1, Math.PI*0.09375, Math.PI*-0.61425]} scale={[0.0382, 0.025, 0.0342]} personalize={personalize}/>
      )}
      {personalize["Thumb Logo/Graphic"] === "Stamped Flag (+$7)" && (
        <StampedFlag nodes={nodes} materials={materials} position={[-0.052, 0.181, 0.006]} rotation={[Math.PI*-1, Math.PI*0.0625, Math.PI*-0.63125]} scale={[0.0440, 0.025, 0.0204]} personalize={personalize}/>
      )}
      {personalize["Palm Stamp"] === "Graphic" && (
        // <PalmGraphic nodes={nodes} materials={materials} position={[xPosition, yPosition, zPosition]} rotation={[Math.PI*xRotation, Math.PI*yRotation, Math.PI*zRotation]} scale={[0.0602, 0.025, 0.0447]} personalize={personalize}/>
        <PalmGraphic nodes={nodes} materials={materials} position={[0.016, 0.236, 0.068]} rotation={[Math.PI*-0.59375, Math.PI*0, Math.PI*-0.0625]} scale={[0.0602, 0.025, 0.0447]} personalize={personalize}/>
      )}
      {personalize["Palm Stamp"] === "Legend Logo" && (
        // <PalmText nodes={nodes} materials={materials} position={[xPosition, yPosition, zPosition]} rotation={[Math.PI*xRotation, Math.PI*yRotation, Math.PI*zRotation]} scale={[0.0800, 0.025, 0.0337]} personalize={personalize}/>
        <PalmText nodes={nodes} materials={materials} position={[0.021, 0.235, 0.069]} rotation={[Math.PI*-0.53125, Math.PI*-0.1875, Math.PI*0]} scale={[0.1200, 0.025, 0.0506]} personalize={personalize}/>
      )}
      {personalize["Palm Stamp"] === "Custom Number" && (
        <>
          <Text
            font={Outlinefont}
            position={[0.017, 0.233, 0.069]}
            rotation={[Math.PI*0, Math.PI*0, Math.PI*-0.21875]}
            // position={[xPosition, yPosition, zPosition]}
            // rotation={[Math.PI*xRotation, Math.PI*yRotation, Math.PI*zRotation]}
            color={"#707070"}
            scale={0.038}
          >
            {personalize["Palm Custom Number"]}
          </Text>
        </>
      )}
       {personalize["Thumb Text"] === "Thumb Text" && (
        <Text
          font={fonts[personalize["Text Font"]]}
          position={[-0.068, 0.196, 0.032]}
          rotation={[Math.PI*-0.48, Math.PI*-0.6875, Math.PI*0]}
          color={personalize["Thumb Text Color"]}
          scale={personalize["Thumb Text Text"]?.length > 10  
          ? 0.012 - 0.0005 * (personalize["Thumb Text Text"]?.length - 10)  
          : 0.012}
        >
          {personalize["Thumb Text Text"]}
        </Text>
      )}
       {personalize["Palm Text"] === "Palm Text" && (
        <Text
          font={fonts[personalize["Text Font"]]}
          // position={[-0.068, 0.196, 0.032]}
          // rotation={[Math.PI*-0.48, Math.PI*-0.6875, Math.PI*0]}
          position={[0.014, 0.19, -0.042]}
          rotation={[Math.PI*0, Math.PI*1, Math.PI*0.07]}
          color={personalize["Palm Text Color"]}
          scale={personalize["Palm Text Text"]?.length > 10  
          ? 0.012 - 0.0010 * (personalize["Palm Text Text"]?.length - 10)  
          : 0.012}
        >
          {personalize["Palm Text Text"]}
        </Text>
      )}
      {(personalize["Flag"] !== null && personalize["Flag"] !== "Other" && personalize["Flag"] !== "None") && (
        <BackFlag nodes={nodes} materials={materials} position={[0.093, 0.241, -0.061]} rotation={[Math.PI*-0.4375, Math.PI*-0.46875, Math.PI*0.9375]} scale={[0.09, 0.015, 0.03]} personalize={personalize} />
      )}

      
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {base.finger_hood_or_pad === "Pad" && (
          <mesh geometry={nodes.pasted__polySurface1.geometry} material-color={colors["Finger Pad"]} material={materials.hood} />
        )}

        {base.finger_hood_or_pad === "Hood" && (
          <mesh geometry={nodes.pasted__polySurface2.geometry} material-color={colors["Finger Hood"]} material={materials.pad} />
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
        {(personalize["Flag"] === null || personalize["Flag"] === "Other" || personalize["Flag"] === "None") && (
          <group position={[41.558, 7.027, -16.35]} rotation={[-2.442, 1.336, 3.113]} scale={1.4}>
            <mesh geometry={nodes.logo_backup1001.geometry} material-color={colors["Logo"]} material={materials.pasted__logo_without_outline_fr} />
            {base.wrist_logo === "Square Patch" && (
              <>
                <mesh geometry={nodes.polySurface111001.geometry} material-color={colors["Square Patch"]} material={materials.blinn13} /> 
                <mesh geometry={nodes.polySurface112001.geometry} material-color={colors["Patch Inner Lines"]} material={matInnerLines} />
                <mesh geometry={nodes.polySurface115001.geometry} material-color={colors["Patch Inner Lines"]} material={matInnerLines} />
                <mesh geometry={nodes.polySurface113001.geometry} material-color={colors["Patch Outer Lines"]} material={matOuterLines} />
                <mesh geometry={nodes.polySurface114001.geometry} material-color={colors["Patch Outer Lines"]} material={matOuterLines} />
              </>
            )}
          </group>
        )}

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
            <mesh geometry={nodes.polySurface111.geometry} material-color={colors["Square Patch"]} material={materials.blinn13} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
            <mesh geometry={nodes.polySurface113.geometry} material-color={colors["Patch Inner Lines"]} material={matOuterLines} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
            <mesh geometry={nodes.polySurface114.geometry} material-color={colors["Patch Inner Lines"]} material={matOuterLines} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
            <mesh geometry={nodes.polySurface112.geometry} material-color={colors["Patch Outer Lines"]} material={matInnerLines} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
            <mesh geometry={nodes.polySurface115.geometry} material-color={colors["Patch Outer Lines"]} material={matInnerLines} position={[-0.529, -3.843, -16.009]} rotation={[-2.256, 0.252, -0.051]} scale={[3.666, 2.288, 2.055]} />
          </>
        )}
      </group>
      {/*Binding*/}
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {textures.binding != null ? (
          <MeshWithTexture geometry={nodes.sweep1.geometry} material-color={colors.binding} material={materials.binding} texture={textures.binding}/>
        ) : (
          <mesh geometry={nodes.sweep1.geometry} material-color={colors.binding} material={materials.binding} />
        )}
        {textures.binding != null ? (
          <MeshWithTexture geometry={nodes.sweep3.geometry} material-color={colors.binding} material={materials.binding} texture={textures.binding}/>
        ) : (
          <mesh geometry={nodes.sweep3.geometry} material-color={colors.binding} material={materials.binding} />
        )}
        {textures.binding != null ? (
          <MeshWithTexture geometry={nodes.sweep6.geometry} material-color={colors.binding} material={materials.binding} texture={textures.binding}/>
        ) : (
          <mesh geometry={nodes.sweep6.geometry} material-color={colors.binding} material={materials.binding} />
        )}
        {textures.binding != null ? (
          <MeshWithTexture geometry={nodes.sweep7.geometry} material-color={colors.binding} material={materials.binding} texture={textures.binding}/>
        ) : (
          <mesh geometry={nodes.sweep7.geometry} material-color={colors.binding} material={materials.binding} />
        )}
      </group>

      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Palm*/}
        {textures.palm }
        <mesh geometry={nodes.polySurface19.geometry} material-color={colors.palm} material={materials.palm} />
        
        {/*Leather1*/}
        {textures.leather1 != null ? (
          <MeshWithTexture geometry={nodes.polySurface6.geometry} material-color={colors.leather1} material={materials.leather1} texture={textures.leather1} tsize={3} />
        ) :(
          <mesh geometry={nodes.polySurface6.geometry} material-color={colors.leather1} material={materials.leather1} />
        )}
        {textures.leather1 != null ? (
          <MeshWithTexture geometry={nodes.polySurface7.geometry} material-color={colors.leather1} material={materials.leather1_1} texture={textures.leather1} tsize={3}/>
        ) : (
          <mesh geometry={nodes.polySurface7.geometry} material-color={colors.leather1} material={materials.leather1_1} />
        )}
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Wrist*/}
        {base.inlay !== null ? (
            <MeshWithTexture geometry={nodes.polySurface108.geometry} material-color={colors.wrist} material={materials.Wrist} texture={blackmesh} tsize={2}/>
        ):(
          <>
          {textures.wrist != null ? (
            <MeshWithTexture geometry={nodes.polySurface108.geometry} material-color={colors.wrist} material={materials.Wrist} texture={textures.wrist} tsize={1} />
          ) : (
            <mesh geometry={nodes.polySurface108.geometry} material-color={colors.wrist} material={materials.Wrist} />
          )}
          </>
        )}
        
        {/*leather1*/}
        {base.inlay === null ? (
          <>
            {textures.leather1 != null ? (
              <MeshWithTexture geometry={nodes.polySurface9.geometry} material-color={colors.leather1} material={materials.leather1_2} texture={textures.leather1} tsize={3}/>
            ): (
              <>
                <mesh geometry={nodes.polySurface9.geometry} material-color={colors.leather1} material={materials.leather1_2} />
              </>
            )}
          </>
        ) : (
          <MeshWithTexture geometry={nodes.polySurface9.geometry} material-color={colors.leather1} material={materials.leather1_2} texture={blackmesh} tsize={5}/>
        )}
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Laces*/}
        <mesh geometry={nodes.Mesh033.geometry} material-color={colors.laces} material={materials.laces1} />
        <mesh geometry={nodes.Mesh033_1.geometry} material-color={colors.laces} material={materials.laces2} />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Stiches*/}
        {textures.Stitches ? (
          <MeshWithTexture geometry={nodes.Mesh034.geometry} material-color={colors.Stitches} material={materials.Stitches2} texture={textures.Stitches}/>
        ) : (
          <mesh geometry={nodes.Mesh034.geometry} material-color={colors.Stitches} material={materials.Stitches2} />
        )}
        {textures.Stitches ? (
          <MeshWithTexture geometry={nodes.Mesh034_1.geometry} material-color={colors.Stitches} material={materials.Stitches1} texture={textures.Stitches}/>
        ) : (
          <mesh geometry={nodes.Mesh034_1.geometry} material-color={colors.Stitches} material={materials.Stitches1} />
        )}
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {/*Palm*/}
        {textures.palm ? (
          <MeshWithTexture geometry={nodes.Mesh036.geometry} material-color={colors.palm} material={materials.Palm} texture={textures.palm}/>
        ) : (
          <mesh geometry={nodes.Mesh036.geometry} material-color={colors.palm} material={materials.Palm} />
        )}
        <mesh geometry={nodes.Mesh036_1.geometry} material-color={"#fefefe"} material={materials.palm_logo} />
      </group>
      {/*Crown*/}
      <mesh geometry={nodes.polySurface10.geometry} material-color={colors["Crown"]} material={materials.crown} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      {/*WebStyle*/}
      {textures.web ? (
        <MeshWithTexture geometry={nodes.polySurface14.geometry} material-color={colors.web} material={materials.web} rotation={[Math.PI / 2, 0, 0]} scale={0.01} texture={textures.web} tsize={1.5}/>
      ) : (
        <mesh geometry={nodes.polySurface14.geometry} material-color={colors.web} material={materials.web} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      )}
    </group>
  )
}

useGLTF.preload("/wp-content/reactpress/apps/catcherminimitt/build/Model/catcher3.glb")