import { useState , useEffect ,useRef } from 'react';
import React from 'react';
import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createNoiseMap from '../scripts/createNoiseMap';
import djikstra from '../scripts/djikstra';
import animatePathFinding from '../scripts/animatePathFinding';

function App() {

  let scene,camera,renderer,controls;
  let pathData = [];
  let vizualizingMesh;
  let pathMesh;

  const drawRanges = {
    vizualizeMeshDrawRange:0,
    pathDrawRange:0
  }
  let worldData;

  useEffect(()=>{
    const initObjects = initScene();
    scene = initObjects.scene;
    camera = initObjects.camera;
    renderer= initObjects.renderer;
    controls = initObjects.controls;

    // gui for map generation control
    const scale = 70;
    const octaves = 4;
    const persistance = 0.5;
    const lacunarity = 2;

    worldData = createNoiseMap(100,100,scale,octaves,persistance,lacunarity,scene);

    animate();

  },[]);

  const findPath = () => {
    pathData= djikstra(worldData.graph,0,4300);
    drawRanges.vizualizeMeshDrawRange = 0;
    drawRanges.pathDrawRange = 0;

    const vizualizingMeshGeometry = new THREE.BufferGeometry();
    vizualizingMeshGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathData.vizualizingGeometry, 3 ));
    vizualizingMeshGeometry.computeVertexNormals();//needed for light to work
    
    const vizualizingMeshMaterial = new THREE.MeshStandardMaterial( {
      side: THREE.DoubleSide,color:0xffffff,opacity:0.4,transparent:true
    });

    vizualizingMesh = new THREE.Mesh( vizualizingMeshGeometry, vizualizingMeshMaterial );
    vizualizingMesh.name = "vizualizingMesh";
    
    scene.remove(scene.getObjectByName("pathMesh"));

    const pathGeometry = new THREE.BufferGeometry();
    pathGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathData.path, 3 ));
    pathGeometry.computeVertexNormals();//needed for light to work
    
    const pathMaterial = new THREE.MeshStandardMaterial( {
      side: THREE.DoubleSide,color:0xff0000
    });

    pathMesh = new THREE.Mesh( pathGeometry, pathMaterial );
    pathMesh.name = "pathMesh";

    pathMesh.geometry.setDrawRange(0,drawRanges.pathDrawRange);
    scene.add(vizualizingMesh);
    scene.add(pathMesh);
  }

  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
  
    // vizualize the pathfinding
    if(pathData.vizualizingGeometry!=undefined){
      animatePathFinding(vizualizingMesh,pathMesh,drawRanges,scene);
    }
  
  };

  return (
    <div className="App" id="App">
        <button onClick={findPath}>click</button>
    </div>
  )
}

export default App
