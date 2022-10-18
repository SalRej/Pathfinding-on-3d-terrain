import React , { useState , useEffect, useRef}from 'react';
import { Routes , Route } from "react-router-dom";

import Home from './Home';
import NoiseGeneration from './NoiseGeneration';
import HeightMapGeneration from './HeightMapGeneration';

import initScene from '../scripts/initScene';
import worldDataContext from './contex';

function App(){
  
  const THREEScene = useRef({
    camera:null,
    scene:null,
    renderer:null,
    controls:null,
  })
  const [pathFindingVariables,setPathFindingVariables] = useState({
    startId:-1,
    endId:-1,
    isEnagled:false,
    graph:[]
  })

  useEffect(()=>{
    const initObjects = initScene();
    THREEScene.current.camera=initObjects.camera;
    THREEScene.current.renderer=initObjects.renderer;
    THREEScene.current.controls=initObjects.controls;
    THREEScene.current.scene=initObjects.scene;
  },[])

  return (
    <div className="App" id="App">
      <worldDataContext.Provider value={{THREEScene, pathFindingVariables}}>
        <Routes>
          <Route path="/" element={<Home />}/>
            <Route path='/noiseGeneration' element={<NoiseGeneration/>}/>
            <Route path='/heightMapGeneration' element={<HeightMapGeneration/>}/>
        </Routes>
      </worldDataContext.Provider>
    </div>
  )
}

export default App
