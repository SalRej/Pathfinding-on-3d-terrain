import { useState , useEffect } from 'react';
import React from 'react';
import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createNoiseMap from '../scripts/createNoiseMap';
import djikstra from '../scripts/djikstra';

function App() {

  let scene,camera,renderer,controls;
  let pathData = [];
  let vizualizingMesh;
  let pathMesh;

  let vizualizeMeshDrawRange = 0;
  let pathDrawRange = 0;
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
    vizualizeMeshDrawRange = 0;
    pathDrawRange = 0;

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
    console.log(pathMesh);
    pathMesh.geometry.setDrawRange(0,pathDrawRange);

    scene.add(vizualizingMesh);
    scene.add(pathMesh);
  }

  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
  
    // vizualize the pathfinding
    if(pathData.vizualizingGeometry!=undefined){
      //vizualize the nodes visited by the djikstra algorithm in order
      if(vizualizeMeshDrawRange <= vizualizingMesh.geometry.attributes.position.array.length/3){
  
        vizualizingMesh.geometry.setDrawRange( 0, vizualizeMeshDrawRange );
        vizualizingMesh.geometry.attributes.position.needsUpdate = true;
        vizualizeMeshDrawRange+=300;
  
      }else{
        // vizualize the path
        console.log(pathDrawRange , pathMesh.geometry.attributes.position.array.length/3);
        scene.remove(scene.getObjectByName("vizualizingMesh"));

        if(pathDrawRange<=pathMesh.geometry.attributes.position.array.length/3){

          pathMesh.geometry.setDrawRange(0,pathDrawRange);
          pathMesh.geometry.attributes.position.needsUpdate=true;
          pathDrawRange+=5;
        }
      }
    }
  
  };

  return (
    <div className="App" id="App">
        <button onClick={findPath}>click</button>
    </div>
  )
}

export default App
