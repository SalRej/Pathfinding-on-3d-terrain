import { useState , useEffect ,useRef } from 'react';
import React from 'react';
import createNoiseMap from '../scripts/createNoiseMap';
import djikstra from '../scripts/djikstra';
import animatePathFinding from '../scripts/animatePathFinding';
import createHeightMap from '../scripts/createHightMap';
import NoiseGeneration from './NoiseGeneration';
import Home from './Home';
import HeightMapGeneration from './HeightMapGeneration';
import { Routes , Route } from "react-router-dom";

function App() {

  // const findPath = () => {
  //   pathData.current = djikstra(worldData.current.graph,3000,25300);

  //   drawRanges.current.vizualizeMeshDrawRange = 0;
  //   drawRanges.current.pathDrawRange = 0;

  //   const vizualizingMeshGeometry = new THREE.BufferGeometry();
  //   vizualizingMeshGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathData.current.vizualizingGeometry, 3 ));
  //   vizualizingMeshGeometry.computeVertexNormals();//needed for light to work
    
  //   const vizualizingMeshMaterial = new THREE.MeshStandardMaterial( {
  //     side: THREE.DoubleSide,color:0xffffff,opacity:0.4,transparent:true
  //   });

  //   vizualizingMesh.current = new THREE.Mesh( vizualizingMeshGeometry, vizualizingMeshMaterial );
  //   vizualizingMesh.current.name = "vizualizingMesh";
  //   scene.current.remove(scene.current.getObjectByName("pathMesh"));

  //   const pathGeometry = new THREE.BufferGeometry();
  //   pathGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathData.current.path, 3 ));
  //   pathGeometry.computeVertexNormals();//needed for light to work
    
  //   const pathMaterial = new THREE.MeshStandardMaterial( {
  //     side: THREE.DoubleSide,color:0xff0000
  //   });

  //   pathMesh.current = new THREE.Mesh( pathGeometry, pathMaterial );
  //   pathMesh.current.name = "pathMesh";

  //   pathMesh.current.geometry.setDrawRange(0,drawRanges.pathDrawRange);

  //   scene.current.add(vizualizingMesh.current);
  //   scene.current.add(pathMesh.current);
  // }

  // function animate() {
  //   requestAnimationFrame( animate );
  //   controls.current.update();
  //   renderer.current.render( scene.current, camera.current );
  
  //   // vizualize the pathfinding
  //   if(pathData.current.vizualizingGeometry!=undefined){
  //     animatePathFinding(vizualizingMesh.current,pathMesh.current,drawRanges.current,scene.current);
  //   }
  // };

  // useEffect(()=>{
  //   if(initialRender.current==true){
  //     initialRender.current=false;
  //   }
  //   else if(initialRender.current==false){

  //     scene.current.remove(scene.current.getObjectByName('worldMesh'));
  //     if(isNoiseMap == true){
  //       worldData.current = createNoiseMap(generationVariables,scene.current,false);
  //     }else{
  //       createHeightMap(heightMapVariables,scene.current);
  //     }
  //   }

  // },[generationVariables,heightMapVariables]);

  // const changeResolution = (value) =>{
  //     setGenerationVariables({
  //       ...generationVariables,
  //       ['width']:value,
  //       ['height']:value
  //     })
  // }
  // const handleNoiseSettings = (event)=>{
  //   setGenerationVariables({
  //     ...generationVariables,
  //     [event.target.name]:event.target.value
  //   })
  // }

  // const handleHeightMapSettings = (event)=>{
  //   setHeightMapVariables({
  //     ...heightMapVariables,
  //     [event.target.name]:event.target.value
  //   })
  // }
  
  return (
    <div className="App" id="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/noiseGeneration' element={<NoiseGeneration/>}/>
        <Route path='/heightMapGeneration' element={<HeightMapGeneration/>}/>
      </Routes>
    </div>
  )
}

export default App
