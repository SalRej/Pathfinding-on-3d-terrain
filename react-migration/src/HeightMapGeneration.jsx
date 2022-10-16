import React , {useState , useEffect , useRef } from 'react'
import HeightMapSettings from './HeightMapSettings';

import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createHeightMap from '../scripts/createHightMap';

function HeightMapGeneration() {
  const scene = useRef(); 
  const camera = useRef ();
  const renderer = useRef();
  const controls = useRef();
  const canvasHolder = useRef(null);
  const initialRender = useRef(true);

  const [heightMapVariables,setHeightMapVariables] = useState({
    numPointsX:200,
    numPointsY:200,
    scaleY:20,
    image:new Image()
  })

  useEffect(()=>{
    const initObjects = initScene();
    scene.current = initObjects.scene;
    camera.current = initObjects.camera;
    renderer.current = initObjects.renderer;
    controls.current = initObjects.controls;

    if(canvasHolder.current!=null){
       canvasHolder.current.appendChild(renderer.current.domElement);
    }

    const size = 100;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.current.add( gridHelper );
    
    createHeightMap(heightMapVariables,scene.current);
    animate();
  },[]);

  function animate() {
    requestAnimationFrame( animate );
    controls.current.update();
    renderer.current.render( scene.current, camera.current );
  
    // vizualize the pathfinding
    // if(pathData.current.vizualizingGeometry!=undefined){
    //   animatePathFinding(vizualizingMesh.current,pathMesh.current,drawRanges.current,scene.current);
    // }
  };

  useEffect(()=>{
    if(initialRender.current==true){
        initialRender.current=false;
    }
    else if(initialRender.current==false){
        scene.current.remove(scene.current.getObjectByName('worldMesh'));
        createHeightMap(heightMapVariables,scene.current);
    }
  },[heightMapVariables]);

  const handleHeightMapSettings = (event)=>{
    setHeightMapVariables({
      ...heightMapVariables,
      [event.target.name]:event.target.value
    })
  }

  const loadImage = (file)=>{
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const uploadedImageUrl = reader.result;
      const image = new Image();

      image.addEventListener('load',()=>{

        setHeightMapVariables({
          ...heightMapVariables,
          image:image
        })

      })
      image.src = uploadedImageUrl;
    });

    reader.readAsDataURL(file[0]);
  }

  return (
    <div className='flex' style={{display:"flex"}}>
            <div ref={canvasHolder} className='canvas_older'></div>
            <div className='settings_holder'>
                <HeightMapSettings
                    heightMapVariables={heightMapVariables}
                    handleHeightMapSettings={handleHeightMapSettings}
                    loadImage={loadImage}
                />
            </div>
        </div>
  )
}

export default HeightMapGeneration