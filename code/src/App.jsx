import React , { useState , useEffect}from 'react';
import { Routes , Route , useLocation } from "react-router-dom";

import Home from './Home';
import NoiseGeneration from './NoiseGeneration';
import HeightMapGeneration from './HeightMapGeneration';
import NotFound from './NotFound';

import initScene from '../scripts/initScene';
import worldDataContext from './contex';
import defaultColorValues from '../scripts/defaultColorValues';

import {createStore} from 'redux';
import allReducers from './reducers';
import {Provider} from 'react-redux';


function App(){
  
  const store = createStore(allReducers);
  const [THREEScene,setTHREEScene] = useState(null);
  const [pathFindingVariables,setPathFindingVariables] = useState(null);
  const [terraformingVariables,setTerraformingVariables] = useState({
    isEnabled:false,
    brushRadius:10,
    brushStrength:0.5
  })
  const [colorValues,setColorValues] = useState(defaultColorValues);

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

      setColorValues(defaultColorValues);
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
        <Provider store={store}>
          <worldDataContext.Provider value={{
            THREEScene,
            setTHREEScene,
            pathFindingVariables,
            setPathFindingVariables,
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
        </Provider>
      }
    </div>
  )
}

export default App
