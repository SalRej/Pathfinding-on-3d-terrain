import { useState , useEffect ,useRef } from 'react';
import React from 'react';
import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createNoiseMap from '../scripts/createNoiseMap';
import djikstra from '../scripts/djikstra';
import animatePathFinding from '../scripts/animatePathFinding';
function App() {

  const scene = useRef();
  const camera = useRef ();
  const renderer = useRef();
  const controls = useRef();
  const pathData = useRef([]);
  const vizualizingMesh = useRef();
  const pathMesh = useRef();

  const drawRanges = useRef({
    vizualizeMeshDrawRange:0,
    pathDrawRange:0
  })

  const worldData = useRef();

  const [ counter , setCounter ] = useState(0);

  useEffect(()=>{
    const initObjects = initScene();
    scene.current = initObjects.scene;
    camera.current = initObjects.camera;
    renderer.current = initObjects.renderer;
    controls.current = initObjects.controls;

    // gui for map generation control
    const scale = 70;
    const octaves = 4;
    const persistance = 0.5;
    const lacunarity = 2;

    worldData.current = createNoiseMap(130,130,scale,octaves,persistance,lacunarity,scene.current);

    animate();

  },[]);

  const findPath = () => {
    pathData.current = djikstra(worldData.current.graph,0,4300);

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

  return (
    <div className="App" id="App">
        <button onClick={findPath}>click</button>
        <button onClick={ ()=>{setCounter((prev)=>prev+1)} }>Increment</button>
        <p>{counter}</p>
    </div>
  )
}

export default App
