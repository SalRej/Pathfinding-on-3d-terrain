import { useState , useEffect ,useRef } from 'react';
import React from 'react';
import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createNoiseMap from '../scripts/createNoiseMap';
import djikstra from '../scripts/djikstra';
import animatePathFinding from '../scripts/animatePathFinding';
import createHeightMap from '../scripts/createHightMap';

function App() {

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
    width:130,
    height:130,
    scale:70,
    octaves:4,
    persistance:0.5,
    lacunarity:2,
    offsetX:0,
    offsetY:0,
    seed:"hello"
  })

  useEffect(()=>{
    const initObjects = initScene();
    scene.current = initObjects.scene;
    camera.current = initObjects.camera;
    renderer.current = initObjects.renderer;
    controls.current = initObjects.controls;

    // worldData.current = createNoiseMap(generationVariables,scene.current,true);
    createHeightMap(100,100,scene.current);
    animate();
  },[]);

  const findPath = () => {
    pathData.current = djikstra(worldData.current.graph,3000,5300);

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
      worldData.current = createNoiseMap(generationVariables,scene.current,false);
    }

  },[generationVariables]);

  const handleGenerationVariableChange = (event)=>{
    setGenerationVariables({
      ...generationVariables,
      [event.target.name]:event.target.value
    })
  }
  return (
    <div className="App" id="App">
        <button onClick={findPath}>click</button>
        <button onClick={ ()=>{setCounter((prev)=>prev+1)} }>Increment</button>

        <form onChange={handleGenerationVariableChange}>
          <p>Scale:{generationVariables.scale}</p>
          <input type='range' min={0} max={200} name="scale" value={generationVariables.scale}></input>
          <p>Octaves:{generationVariables.octaves}</p>
          <input type='range' min={0} max={10} name="octaves" value={generationVariables.octaves}></input>
          <p>Lacunarity:{generationVariables.lacunarity}</p>
          <input type='range' min={0} max={5} name="lacunarity" value={generationVariables.lacunarity}></input>
          <p>Persistance:{generationVariables.persistance}</p>
          <input type='range' min={0} max={2} name="persistance" value={generationVariables.persistance}></input>

          <p>offsetX:{generationVariables.offsetX}</p>
          <input type='range' min={0} max={5} name="offsetX" step={0.1} value={generationVariables.offsetX}></input>
          <p>offsetY:{generationVariables.offsetY}</p>
          <input type='range' min={0} max={5} name="offsetY" step={0.1} value={generationVariables.offsetY}></input>
          
          <p>Seed</p>
          <input type='text' name="seed" value={generationVariables.seed}></input>
        </form>
    </div>
  )
}

export default App
