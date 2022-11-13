import React , { useState , useEffect}from 'react';
import { Routes , Route , useLocation } from "react-router-dom";

import Home from './Home';
import NoiseGeneration from './NoiseGeneration';
import HeightMapGeneration from './HeightMapGeneration';
import NotFound from './NotFound';

import initScene from '../scripts/initScene';
import worldDataContext from './contex';
import defaultColorValues from '../scripts/defaultColorValues';

import {useDispatch} from 'react-redux';
import { resetPathfinding } from './actions/pathFindingActions';
function App(){
  
  const [THREEScene,setTHREEScene] = useState(null);
  const [terraformingVariables,setTerraformingVariables] = useState({
    isEnabled:false,
    brushRadius:10,
    brushStrength:0.5
  })
  const [colorValues,setColorValues] = useState(defaultColorValues);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(()=>{
    //this code runs on a route change
    if(location.pathname==='/'){
      
      dispatch(resetPathfinding());

      setTerraformingVariables({
        ...terraformingVariables,
        isEnabled:false
      })

      setColorValues(defaultColorValues);
    }

  },[location.pathname])

  useEffect(()=>{
    const initObjects = initScene();
    setTHREEScene({
      camera:initObjects.camera,
      scene:initObjects.scene,
      renderer:initObjects.renderer,
      controls:initObjects.controls
    })

  },[])
  
  return (
    <div className="App" id="App">
      {(THREEScene!=null)&&
          <worldDataContext.Provider value={{
            THREEScene,
            setTHREEScene,
            terraformingVariables,
            setTerraformingVariables,
            colorValues,
            setColorValues
          }}>
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
