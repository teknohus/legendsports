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
const PalmText = ({ nodes, materials, position, rotation, scale, personalize }) => {
  // const graphicTexture = useTexture(LegendLogo);
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
  const { nodes, materials } = useGLTF("/wp-content/reactpress/apps/firstbaselegend/build/Model/untitled1-v2.glb")

  const matPad = materials.lambert1.clone();
  const matStitches = materials.lambert1.clone();
  const matLogo = materials.Default_Material.clone();
  const matLogoOutline = materials.Default_Material.clone();
  const matCirclePlate = materials.lambert1.clone();
  const matSquarePatch = materials.lambert1.clone();
  const matSquarePatchInnerLines = materials.lambert1.clone();
  const matSquarePatchOuterLines = materials.lambert1.clone();
  const matPalm = materials.lambert1.clone();
  const matPalm2 = materials.Default_Material.clone();

  const ref = useRef();

  const pos0 = 0;
  const pos1 = 1 * (-Math.PI / 2);
  const pos2 = 2 * (-Math.PI / 2);
  
  useFrame(() => {
    if (rot === pos0) {
      ref.current.rotation.y = rot
    }
    else if(rot === pos1) {
      ref.current.rotation.x = 1.839
      ref.current.rotation.y = -0.359;
      ref.current.rotation.z = 1.459;
    }
    else {
      ref.current.rotation.y = rot-0.60
    }
  })

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
    <group dispose={null} position={[rot === pos0 ? -scaledPos0x : rot === pos1 ? scaledPos1x : scaledPos2x, rot === pos1 ? scaledPos1y : -scaledPos0y, 0]} scale={scale} ref={ref}>
      
      {personalize["Thumb Logo/Graphic"] === "Graphic (+$7)" && (
          <ThumbGraphic nodes={nodes} materials={materials} position={[0.0813, 0.139, 0.038]} rotation={[Math.PI*0.119, Math.PI*-0.96, Math.PI*0.405]} scale={[0.0450, 0.025, 0.0350]} personalize={personalize}/>
      )}
      {personalize["Thumb Logo/Graphic"] === "Premium Graphic (+$15)" && (
        <ThumbPremiumGraphic nodes={nodes} materials={materials} position={[0.0813, 0.139, 0.038]} rotation={[Math.PI*0.119, Math.PI*-0.96, Math.PI*0.405]} scale={[0.0382, 0.025, 0.0342]} personalize={personalize}/>
      )}
      {personalize["Thumb Logo/Graphic"] === "Stamped Flag (+$7)" && (
        <StampedFlag nodes={nodes} materials={materials} position={[0.0813, 0.139, 0.038]} rotation={[Math.PI*0.119, Math.PI*-0.96, Math.PI*0.405]} scale={[0.0440, 0.025, 0.0204]} personalize={personalize}/>
      )}
      {personalize["Thumb Logo/Graphic"] === "Jumbo Number (+$7)" && (
        <Text
          font={fonts[personalize["Text Font"]]}
          position={[0.0643, 0.13, 0.039]}
          rotation={[Math.PI*0.064, Math.PI*-0.5, Math.PI*0.5]}
          color={personalize["Jumbo Number Color"]}
          scale={0.03}
        >
          {personalize["Jumbo Number"]}
        </Text>
      )}
      {personalize["Thumb Logo/Graphic"] === "Custom Plate Number (+$7)" && (
        <>
          {/* <mesh geometry={nodes.polySurface12596.geometry} material={materials['web2:logo3']} />
          <mesh geometry={nodes.polySurface4478.geometry} material={materials['web2:logo3']} /> */}
          <mesh geometry={nodes.polySurface4479.geometry} material={materials['web2:Logo_circle1']} />
          <Text
            font={fonts[personalize["Text Font"]]}
            position={[0.0643, 0.123, 0.043]}
            rotation={[Math.PI*0.064, Math.PI*-0.5, Math.PI*0.5]}
            color={personalize["Custom Plate Number Color"]}
            scale={0.024}
          >
            {personalize["Custom Plate Number"]}
          </Text>
        </>
      )}
    {personalize["Thumb Logo/Graphic"] === "Circle Logo" && (
      <>
        <mesh geometry={nodes.polySurface4478.geometry} material-color={colors["Logo"]} material={materials['web2:logo3']} />
        <mesh geometry={nodes.polySurface4479.geometry} material={materials['web2:Logo_circle1']} />
      </>
    )}
    {personalize["Thumb Logo/Graphic"] === "Logo" && (
      <>
        <mesh geometry={nodes.polySurface4478.geometry} material-color={colors["Logo"]} material={materials['web2:logo3']} />
      </>
    )}

    {personalize["Palm Stamp"] === "Legend Logo" && (
      <mesh geometry={nodes.polySurface12596.geometry} material-color={colors["Logo"]} material={materials['web2:logo3']} />
    )}
    {personalize["Palm Stamp"] === "Legend Horse Stamp" && (
        <PalmStamp nodes={nodes} materials={materials} position={[0.132, 0.173, 0.017]} rotation={[-0.55*Math.PI, 0*Math.PI, 0*Math.PI]} personalize={personalize} scale={[0.080, 0.040, 0.040]} /> 
    )}
    {personalize["Palm Stamp"] === "Custom Number" && (
      <>
        <Text
          font={Outlinefont}
          position={[0.132, 0.173, 0.017]}
          rotation={[0*Math.PI, 0*Math.PI, 0*Math.PI]}
          color={"#707070"}
          scale={0.024}
        >
          {personalize["Palm Custom Number"]}
        </Text>
      </>
    )}
    {personalize["Palm Stamp"] === "Graphic" && (
      <>
        <PalmGraphic nodes={nodes} materials={materials} position={[0.132, 0.173, 0.017]} rotation={[-0.55*Math.PI, 0*Math.PI, 0*Math.PI]} personalize={personalize} scale={[0.0400, 0.025, 0.0300]} />
      </>
    )}

    {rot !== pos2 && personalize["Thumb Text"] && (
      <Text
        font={fonts[personalize["Text Font"]]}
        position={[0.0783, 0.19, 0.102]}
        rotation={[Math.PI*-0.073, Math.PI*-0.597, Math.PI*0.280]}
        color={personalize["Thumb Text Color"]}
        scale={ personalize["Text Font"] === "Script" ?
          personalize["Thumb Text Text"]?.length > 12  
            ? 0.0125 - 0.000875 * (personalize["Thumb Text Text"]?.length - 12)  
            : 0.0125
          :
          personalize["Thumb Text Text"]?.length > 10  
          ? 0.0125 - 0.000875 * (personalize["Thumb Text Text"]?.length - 10)  
          : 0.0125 
        }
      >
        {personalize["Thumb Text Text"]}
      </Text>
    )}
    {rot !== pos1 && personalize["Index Text"] && (
      <Text
        font={fonts[personalize["Text Font"]]}
        position={[xPosition, yPosition, zPosition]}
        rotation={[Math.PI*xRotation, Math.PI*yRotation, Math.PI*zRotation]}
        // position={[0.0643, 0.123, 0.043]}
        // rotation={[Math.PI*0.064, Math.PI*-0.5, Math.PI*0.5]}
        color={personalize["Index Text Color"]}
        scale={ personalize["Text Font"] === "Script" ?
          personalize["Index Text Text"]?.length > 12  
            ? 0.0125 - 0.000875 * (personalize["Index Text Text"]?.length - 12)  
            : 0.0125
          :
          personalize["Index Text Text"]?.length > 10  
          ? 0.0125 - 0.000875 * (personalize["Index Text Text"]?.length - 10)  
          : 0.0125 
        }
      >
        {personalize["Index Text Text"]}
      </Text>
    )}

      
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01} >
        {/* <group position={[0.724, 0.889, -0.273]} rotation={[-0.005, 0.037, -0.076]} scale={0.949}>
          <mesh geometry={nodes.MASH4_ReproMesh1.geometry} material={materials.lambert1} />
          <mesh geometry={nodes.pDisc2.geometry} material={materials.lambert1} />
          <mesh geometry={nodes.polySurface12583001.geometry} material={materials.Default_Material} />
          <mesh geometry={nodes.polySurface12586001.geometry} material={materials.Default_Material} />
        </group> */}
        {/* <mesh geometry={nodes.wrist_logo001.geometry} material={materials.Default_Material} /> */}


        {/*Embroidered*/}
        {base.wrist_logo === "Embroidered" && (
          <>
            <mesh geometry={nodes.polySurface12583.geometry} material-color={colors["Logo"]} material={matLogo} />
          </>
        )}

        {/*Logo Outline*/}
        {base.logo_outline === "Enable Logo Outline" && (
          <mesh geometry={nodes.polySurface12586.geometry} material-color={colors.logo_outline_color} material={matLogoOutline} />
        )}
        
        {/*Circle Patch*/}
        {base.wrist_logo === "Circle Patch" && (
          <>
            <mesh geometry={nodes.MASH4_ReproMesh.geometry} material-color={colors.Stitches} material={materials.lambert1} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
            <mesh geometry={nodes.pDisc1.geometry} material-color={colors.wristPlate} material={matCirclePlate} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
            <mesh geometry={nodes.wrist_logo002.geometry} material-color={colors["Logo"]} material={matLogo} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          </>
        )}
        
        {/*Square Logo*/}
        {base.wrist_logo === "Square Patch" && (
          <>
            <mesh geometry={nodes.polySurface12587.geometry} material-color={colors["Square Patch"]} material={matSquarePatch} />
            <mesh geometry={nodes.polySurface12589.geometry} material-color={colors["Patch Inner Lines"]} material={matSquarePatchInnerLines} />
            <mesh geometry={nodes.polySurface12588.geometry} material-color={colors["Patch Outer Lines"]} material={matSquarePatchOuterLines} />
            <mesh geometry={nodes.wrist_logo.geometry} material-color={colors["Logo"]} material={matLogo} />
          </>
        )}
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        {base["Web Style"] === "2-Piece Web" && (
          <group position={[0.309, 0.241, -0.947]} scale={0.959}>
            <mesh geometry={nodes.body.geometry} material-color={colors.web} material={materials['we1:web1']} />
            <mesh geometry={nodes.laces001.geometry} material-color={colors.laces} material={materials.Default_Material} />
            <mesh geometry={nodes.Mesh042.geometry} material-color={colors.Stitches} material={materials['we1:stiches1']} />
            <mesh geometry={nodes.Mesh042_1.geometry} material-color={colors.web} material={materials['we1:web1']} />
          </group>
        )}
        {base["Web Style"] === "H Web" && (
          <>
            <mesh geometry={nodes.polySurface11.geometry} material-color={colors.web} material={materials['web2:web1']} />
            <mesh geometry={nodes.stitches001.geometry} material-color={colors.Stitches} material={materials['web2:stiches1']} />
            <mesh geometry={nodes.Mesh038.geometry} material-color={colors.laces} material={materials.Default_Material} />
            <mesh geometry={nodes.Mesh038_1.geometry} material-color={colors.laces} material={materials['web2:laces1']} />
          </>
        )}
        {base["Web Style"] === "Post Web" && (
          <>
            <mesh geometry={nodes.laces002.geometry} material-color={colors.laces} material={materials['untitled:laces_002']} />
            <mesh geometry={nodes.stitches003.geometry} material-color={colors.Stitches} material={materials['untitled:stiches_002']} />
            <mesh geometry={nodes.Mesh045.geometry} material-color={colors.web} material={materials['untitled:web_002']} />
            <mesh geometry={nodes.Mesh045_1.geometry} material-color={colors.Stitches} material={materials['untitled:stiches_002']} />
          </>
        )}
      </group>
      {/* <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.MASH1_ReproMesh.geometry} material={materials.lambert1} />
        <mesh geometry={nodes.polySurface12580.geometry} material={materials.lambert1} />
      </group> */}
      
      {/* <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.mesh_palm.geometry} material={materials.lambert1} />
        <mesh geometry={nodes.polySurface12590.geometry} material={materials.lambert1} />
        <mesh geometry={nodes.polySurface12591.geometry} material={materials.lambert1} />
        <mesh geometry={nodes.polySurface12593.geometry} material={materials.lambert1} />
        <mesh geometry={nodes.polySurface12595.geometry} material={materials.lambert1} />
      </group> */}

      {base.finger_pad === "Pad" && (
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.MASH2_ReproMesh.geometry} material-color={colors.Stitches} material={matStitches} />
          <mesh geometry={nodes.polySurface12579.geometry} material-color={colors["Finger Pad"]} material={matPad} />
        </group>
      )}
      
      {/* <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.MASH3_ReproMesh.geometry} material={materials.lambert1} />
        <mesh geometry={nodes.polySurface12582.geometry} material={materials.lambert1} />
      </group> */}

      <mesh geometry={nodes.back.geometry} material-color={colors.leather1} material={materials['web2:leather2']} />
      <mesh geometry={nodes.bindings.geometry} material-color={colors.binding} material={materials['web2:binding1']} />

      <mesh geometry={nodes.hole_cover.geometry} material={materials['web2:leather2']} />
      <mesh geometry={nodes.inlay.geometry} material-color={colors["Web Crown"]} material={materials['web2:WebCrown1']} />
      
      <mesh geometry={nodes.wrist.geometry} material-color={colors.wrist} material={materials['web2:wrist1']} />

      <mesh geometry={nodes.Mesh017.geometry} material-color={colors.palm} material={matPalm} />
      <mesh geometry={nodes.Mesh017_1.geometry} material-color={colors.palm} material={matPalm2} />
      
      <mesh geometry={nodes.Mesh002.geometry} material-color={colors.laces} material={materials['web2:laces1']} />
      <mesh geometry={nodes.Mesh002_1.geometry} material-color={colors.laces} material={materials.Default_Material} />
      <mesh geometry={nodes.Mesh007.geometry} material-color={colors.Stitches} material={materials['web2:stiches1']} />
      <mesh geometry={nodes.Mesh007_1.geometry} material-color={colors.Stitches} material={materials['web2:web1']} />

      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Puerto Rico" && (
        <mesh geometry={nodes.Logo1.geometry} material={materials.logo1} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Venezuela" && (
        <mesh geometry={nodes.Logo2.geometry} material={materials.Logo2} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Italy" && (
        <mesh geometry={nodes.Logo3.geometry} material={materials.Logo3} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Australia" && (
        <mesh geometry={nodes.Logo4.geometry} material={materials.Logo4} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Japan" && (
        <mesh geometry={nodes.Logo5.geometry} material={materials.Logo5} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Dominican Republic" && (
        <mesh geometry={nodes.Logo6.geometry} material={materials.Logo6} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Netherlands" && (
        <mesh geometry={nodes.Logo7.geometry} material={materials.Logo7} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Korea" && (
        <mesh geometry={nodes.Logo8.geometry} material={materials.Logo8} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Canada" && (
       <mesh geometry={nodes.Logo9.geometry} material={materials.Logo9} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "USA" && (
       <mesh geometry={nodes.Logo10.geometry} material={materials.Logo10} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {base.wrist_logo === "Embriodered Flag (+$7)" && base.embroidered_flag === "Mexico" && (
        <mesh geometry={nodes.Logo11.geometry} material={materials.Logo11} position={[0.11, 0.112, -0.01]} rotation={[1.857, -0.219, 2.422]} scale={0.011} />
      )}
      {/* <mesh geometry={nodes.single_stitch.geometry} material={materials.lambert1} /> */}
  </group>
  )
}

useGLTF.preload("/wp-content/reactpress/apps/firstbaselegend/build/Model/untitled1-v2.glb")