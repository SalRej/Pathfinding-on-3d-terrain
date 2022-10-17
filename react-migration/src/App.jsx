import React from 'react';
import { Routes , Route } from "react-router-dom";

import Home from './Home';
import NoiseGeneration from './NoiseGeneration';
import HeightMapGeneration from './HeightMapGeneration';

function App() {

  // const findPath = () => {
  //   pathData.current = djikstra(worldData.current.graph,3000,25300);
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
