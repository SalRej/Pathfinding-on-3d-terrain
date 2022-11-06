import { useState , useEffect } from 'react';
import * as THREE from 'three';
import initScene from '../../code/scripts/initScene';



function App() {

  let scene,camera,renderer,controls;
  
  useEffect(()=>{
    const initObjects = initScene();
    scene = initObjects.scene;
    camera = initObjects.camera;
    renderer= initObjects.renderer;
    controls = initObjects.controls;
    animate();
  },[])

  function animate() {
    requestAnimationFrame( animate );
    // controls.update();
    renderer.render( scene, camera );
  
    //vizualize the pathfinding
    // if(pathData.vizualizingGeometry!=undefined){
  
  
    //   //vizualize the nodes visited by the djikstra algorithm in order
    //   if(vizualizeMeshDrawRange <= vizualizingMesh.geometry.attributes.position.array.length/3){
  
    //     vizualizingMesh.geometry.setDrawRange( 0, vizualizeMeshDrawRange );
    //     vizualizingMesh.geometry.attributes.position.needsUpdate = true;
    //     vizualizeMeshDrawRange+=300;
  
    //   }else{
    //     // vizualize the path
    //     scene.remove(scene.getObjectByName("vizualizingMesh"));
    //     if(pathDrawRange<=pathMesh.geometry.attributes.position.array.length/3){
    //       pathMesh.geometry.setDrawRange(0,pathDrawRange);
    //       pathMesh.geometry.attributes.position.needsUpdate=true;
    //       pathDrawRange+=5;
    //     }
    //   }
    // }
  
  };
  return (
    <div className="App">
      works
    </div>
  )
}

export default App
