import React , {useState , useEffect , useRef , useContext} from 'react'
import HeightMapSettings from './HeightMapSettings';

import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createHeightMap from '../scripts/createHightMap';
import worldDataContext from './contex';
function HeightMapGeneration() {
  
  const canvasHolder = useRef(null);
  const initialRender = useRef(true);
  const worldData = useContext(worldDataContext);

  console.log(worldData);

  const [heightMapVariables,setHeightMapVariables] = useState({
    numPointsX:100,
    numPointsY:100,
    scaleY:20,
    image:new Image()
  })

  useEffect(()=>{

    if(canvasHolder.current!=null){
       canvasHolder.current.appendChild(renderer.current.domElement);
    }

    createHeightMap(heightMapVariables,scene.current);
    animate();
  },[]);

  function animate() {
    requestAnimationFrame( animate );
    controls.current.update();
    renderer.current.render( scene.current, camera.current );
  };

  const setIsPathfindingEnabled = (boolean) =>{
    setPathFindingVariables({
        ...pathFindingVariables,
        isEnagled:boolean
    })
  }

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

  const changeResolution = (value)=>{
    console.log(value);
    setHeightMapVariables({
      ...heightMapVariables,
      numPointsX:value,
      numPointsY:value
    })
  }

  return (
    <div className='flex' style={{display:"flex"}}>
            <div ref={canvasHolder} className='canvas_older'></div>
            <div className='settings_holder'>
                <HeightMapSettings
                    heightMapVariables={heightMapVariables}
                    handleHeightMapSettings={handleHeightMapSettings}
                    loadImage={loadImage}
                    changeResolution={changeResolution}
                />
            </div>
        </div>
  )
}

export default HeightMapGeneration