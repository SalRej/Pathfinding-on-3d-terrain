import React , { useEffect }from 'react';
import { Routes , Route , useLocation } from "react-router-dom";

import Home from './Home';
import NoiseGeneration from './NoiseGeneration';
import HeightMapGeneration from './HeightMapGeneration';
import NotFound from './NotFound';

import { useDispatch, useSelector } from 'react-redux';
import { resetPathfinding } from './actions/pathFindingActions';
import { resetTerraforming } from './actions/terraformingActions';
import { resetColors } from './actions/colorsActions';
import { initThreeScene } from './actions/threeSceneActions';
function App(){
  
  const THREEScene = useSelector(state => state.THREEScene);
  const colorValues = useSelector(state => state.colorValues);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=>{
    //this code runs on a route change
    if(location.pathname==='/'){
      
      dispatch(resetPathfinding());
      dispatch(resetTerraforming());
      dispatch(resetColors());
      // setColorValues(defaultColorValues);
    }

  },[location.pathname])

  useEffect(()=>{
    dispatch(initThreeScene());
  },[])

  return (
    <div className="App" id="App">
      {(THREEScene!=null) &&
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/" element={<Home />}/>
              <Route path='/noiseGeneration' element={<NoiseGeneration/>}/>
              <Route path='/heightMapGeneration' element={<HeightMapGeneration/>}/>
            </Routes>
      }
    </div>
  )
}

export default App
