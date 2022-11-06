import React , { useState , useEffect}from 'react';
import { Routes , Route , useLocation } from "react-router-dom";

import Home from './Home';
import NoiseGeneration from './NoiseGeneration';
import HeightMapGeneration from './HeightMapGeneration';
import NotFound from './NotFound';

import initScene from '../scripts/initScene';
import worldDataContext from './contex';

function App(){
  
  const [THREEScene,setTHREEScene] = useState(null);
  const [pathFindingVariables,setPathFindingVariables] = useState(null);
  const [terraformingVariables,setTerraformingVariables] = useState({
    isEnabled:false,
    brushRadius:10,
    brushStrength:0.5
  })

  let location = useLocation();

  useEffect(()=>{
    //this code runs on a route change
    if(location.pathname==='/'){
      setPathFindingVariables({
        ...pathFindingVariables,
        startId:-1,
        endId:-1,
        isEnagled:false,
      })

      setTerraformingVariables({
        ...terraformingVariables,
        isEnabled:false
      })
    }

  },[location.pathname])

  useEffect(()=>{
    const initObjects = initScene();
    
    setPathFindingVariables({
      startId:-1,
      endId:-1,
      isEnagled:false,
      graph:[]
    })

    setTHREEScene({
      camera:initObjects.camera,
      scene:initObjects.scene,
      renderer:initObjects.renderer,
      controls:initObjects.controls
    })

  },[])
  
  return (
    <div className="App" id="App">
      {(THREEScene!=null && pathFindingVariables!=null)&&
        <worldDataContext.Provider value={{THREEScene,setTHREEScene, pathFindingVariables,setPathFindingVariables , terraformingVariables , setTerraformingVariables}}>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path="/" element={<Home />}/>
            <Route path='/noiseGeneration' element={<NoiseGeneration/>}/>
            <Route path='/heightMapGeneration' element={<HeightMapGeneration/>}/>
          </Routes>
        </worldDataContext.Provider>
      }
    </div>
  )
}

export default App
