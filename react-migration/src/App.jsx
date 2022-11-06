import { useState , useEffect ,useRef } from 'react';
import React from 'react';
import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createNoiseMap from '../scripts/createNoiseMap';
import djikstra from '../scripts/djikstra';
import animatePathFinding from '../scripts/animatePathFinding';
import createHeightMap from '../scripts/createHightMap';
import NoiseGeneratorControls from './NoiseGeneratorControls';
import HeightMapSettings from './HeightMapSettings';
function App() {

  let isNoiseMap = false;
  const scene = useRef();
  const camera = useRef ();
  const renderer = useRef();
  const controls = useRef();
  const pathData = useRef([]);
  const vizualizingMesh = useRef();
  const pathMesh = useRef();

  const initialRender = useRef(true);
  const drawRanges = useRef({
    vizualizeMeshDrawRange:0,
    pathDrawRange:0
  })

  const worldData = useRef();

  //world generation varaibles 
  const [generationVariables,setGenerationVariables] = useState({
    width:300,
    height:300,
    scale:70,
    octaves:4,
    persistance:0.5,
    lacunarity:2,
    offsetX:0,
    offsetY:0,
    scaleY:20,
    seed:"hello"
  })

  const [heightMapVariables,setHeightMapVariables] = useState({
    numPointsX:300,
    numPointsY:300,
    scaleY:20
  })

  useEffect(()=>{
    const initObjects = initScene();
    scene.current = initObjects.scene;
    camera.current = initObjects.camera;
    renderer.current = initObjects.renderer;
    controls.current = initObjects.controls;

    const size = 100;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.current.add( gridHelper );

    const start = Date.now();
    // worldData.current = createNoiseMap(generationVariables,scene.current,false);
    // createHeightMap(heightMapVariables,scene.current);
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
    //300-600
    // animate();
  },[]);

  const findPath = () => {
    pathData.current = djikstra(worldData.current.graph,3000,25300);

    drawRanges.current.vizualizeMeshDrawRange = 0;
    drawRanges.current.pathDrawRange = 0;

    const vizualizingMeshGeometry = new THREE.BufferGeometry();
    vizualizingMeshGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathData.current.vizualizingGeometry, 3 ));
    vizualizingMeshGeometry.computeVertexNormals();//needed for light to work
    
    const vizualizingMeshMaterial = new THREE.MeshStandardMaterial( {
      side: THREE.DoubleSide,color:0xffffff,opacity:0.4,transparent:true
    });

    vizualizingMesh.current = new THREE.Mesh( vizualizingMeshGeometry, vizualizingMeshMaterial );
    vizualizingMesh.current.name = "vizualizingMesh";
    scene.current.remove(scene.current.getObjectByName("pathMesh"));

    const pathGeometry = new THREE.BufferGeometry();
    pathGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathData.current.path, 3 ));
    pathGeometry.computeVertexNormals();//needed for light to work
    
    const pathMaterial = new THREE.MeshStandardMaterial( {
      side: THREE.DoubleSide,color:0xff0000
    });

    pathMesh.current = new THREE.Mesh( pathGeometry, pathMaterial );
    pathMesh.current.name = "pathMesh";

    pathMesh.current.geometry.setDrawRange(0,drawRanges.pathDrawRange);

    scene.current.add(vizualizingMesh.current);
    scene.current.add(pathMesh.current);
  }

  function animate() {
    requestAnimationFrame( animate );
    controls.current.update();
    renderer.current.render( scene.current, camera.current );
  
    // vizualize the pathfinding
    if(pathData.current.vizualizingGeometry!=undefined){
      animatePathFinding(vizualizingMesh.current,pathMesh.current,drawRanges.current,scene.current);
    }
  };

  useEffect(()=>{
    if(initialRender.current==true){
      initialRender.current=false;
    }
    else if(initialRender.current==false){

      scene.current.remove(scene.current.getObjectByName('worldMesh'));
      if(isNoiseMap == true){
        worldData.current = createNoiseMap(generationVariables,scene.current,false);
      }else{
        createHeightMap(heightMapVariables,scene.current);
      }
    }

  },[generationVariables,heightMapVariables]);

  const changeResolution = (value) =>{
      setGenerationVariables({
        ...generationVariables,
        ['width']:value,
        ['height']:value
      })
  }
  const handleNoiseSettings = (event)=>{
    setGenerationVariables({
      ...generationVariables,
      [event.target.name]:event.target.value
    })
  }

  const handleHeightMapSettings = (event)=>{
    
    console.log(event.target.name);
    console.log(event.target.value);

    setHeightMapVariables({
      ...heightMapVariables,
      [event.target.name]:event.target.value
    })
  }
  return (
    <div className="App" id="App">
      <video autoplay="autoplay" muted loop id="myVideo">
        <source src="/video/earth-rotation.mp4" type="video/mp4"></source>
      </video>

        {/* <button onClick={findPath}>click</button> */}
        {/* <NoiseGeneratorControls 
          generationVariables={generationVariables}
          handleNoiseSettings={handleNoiseSettings}
          changeResolution={changeResolution}
        /> */}

        {/* <HeightMapSettings heightMapVariables={heightMapVariables} handleHeightMapSettings={handleHeightMapSettings} /> */}
    </div>
  )
}

export default App
