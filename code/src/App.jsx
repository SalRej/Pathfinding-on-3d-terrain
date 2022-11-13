import React , { useState , useEffect}from 'react';
import { Routes , Route , useLocation } from "react-router-dom";

import Home from './Home';
import NoiseGeneration from './NoiseGeneration';
import HeightMapGeneration from './HeightMapGeneration';
import NotFound from './NotFound';

import worldDataContext from './contex';
import defaultColorValues from '../scripts/defaultColorValues';

import {useDispatch, useSelector} from 'react-redux';
import { resetPathfinding } from './actions/pathFindingActions';
import { resetTerraforming } from './actions/terraformingActions';
import { initThreeScene } from './actions/threeSceneActions';
function App(){
  
  const [colorValues,setColorValues] = useState(defaultColorValues);
  const THREEScene = useSelector(state => state.THREEScene);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=>{
    //this code runs on a route change
    if(location.pathname==='/'){
      
      dispatch(resetPathfinding());
      dispatch(resetTerraforming());

      setColorValues(defaultColorValues);
    }

  },[location.pathname])

  useEffect(()=>{
    dispatch(initThreeScene());
  },[])

  return (
    <div className="App" id="App">
      {(THREEScene!=null) &&
          <worldDataContext.Provider value={{
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
