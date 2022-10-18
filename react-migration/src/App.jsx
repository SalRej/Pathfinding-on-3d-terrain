import React , { useState , useEffect, useRef}from 'react';
import { Routes , Route } from "react-router-dom";

import Home from './Home';
import NoiseGeneration from './NoiseGeneration';
import HeightMapGeneration from './HeightMapGeneration';

import initScene from '../scripts/initScene';
import worldDataContext from './contex';

function App(){
  
  const initObjects = initScene();
  const THREEScene = useRef({
    camera:initObjects.camera,
    scene:initObjects.scene,
    renderer:initObjects.renderer,
    controls:initObjects.controls,
  })

  const [pathFindingVariables,setPathFindingVariables] = useState({
    startId:-1,
    endId:-1,
    isEnagled:false,
    graph:[]
  })

  const setIsPathfindingEnabled = (boolean) =>{
    setPathFindingVariables({
        ...pathFindingVariables,
        isEnagled:boolean
    })
  }
  

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
