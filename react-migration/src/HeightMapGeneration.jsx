import React , {useState , useEffect , useRef , useContext} from 'react';

import HeightMapSettings from './HeightMapSettings';
import createHeightMap from '../scripts/heightMapGeneration/createHightMap';
import worldDataContext from './contex';
import BackButton from './BackButton';

import useTriggerControls from './hooks/useTriggerControls';
import useHandleGenerationChange from './hooks/useHandleGenerationChange';
import useOnPathChange from './hooks/useOnPathChange';
import useOnButtonHold from './hooks/useOnButtonHold';

import getTriangleClicked from '../scripts/getTriangleClicked';

function HeightMapGeneration() {
  
  const canvasHolder = useRef(null);
  const initialRender = useRef(true);
  const mouseX = useRef(null);
  const mouseY = useRef(null);

  const {THREEScene ,setTHREEScene, pathFindingVariables, setPathFindingVariables, terraformingVariables} = useContext(worldDataContext);

  const [heightMapVariables,setHeightMapVariables] = useState({
    numPointsX:100,
    numPointsY:100,
    scaleY:20,
    image:new Image()
  })

  useEffect(()=>{
    
    if(canvasHolder.current!=null){
       canvasHolder.current.appendChild(THREEScene.renderer.domElement);
    }

    THREEScene.scene.remove(THREEScene.scene.getObjectByName('worldMesh'));
    THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh')); 
    const graph = createHeightMap(heightMapVariables,THREEScene.scene);

    setPathFindingVariables({
      ...pathFindingVariables,
      graph:graph
    })

    window.addEventListener('mousemove',(event)=>{
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    })
    animate();
  },[]);

  
  function animate() {
    requestAnimationFrame( animate );
    THREEScene.controls.update();
    THREEScene.renderer.render( THREEScene.scene, THREEScene.camera );
  };

  useTriggerControls(THREEScene,setTHREEScene,terraformingVariables);
  useHandleGenerationChange(initialRender,THREEScene,setPathFindingVariables,createHeightMap,heightMapVariables);
  useOnPathChange(pathFindingVariables,THREEScene);
  const {startCounter,stopCounter} = useOnButtonHold(THREEScene,terraformingVariables,pathFindingVariables,mouseX,mouseY,heightMapVariables.scaleY);

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
    setHeightMapVariables({
      ...heightMapVariables,
      numPointsX:value,
      numPointsY:value
    })
  }

    const canvasClicked = (event)=>{
      event.preventDefault();
      event.stopPropagation();
      if(terraformingVariables.isEnabled === true){
        return;
      }

      const {camera,renderer,scene} = THREEScene;
      const clickedFace = getTriangleClicked(mouseX.current,mouseY.current,renderer,camera,scene);

      if(clickedFace===null)
          return;
          
      if(pathFindingVariables.isEnagled===false)
          return;

      if(pathFindingVariables.graph[clickedFace].isObstical===true){
        alert("cant travel on water");
        return;
      }

      //click means left button is clicked
      if(event.type === "click"){
          setPathFindingVariables({
              ...pathFindingVariables,
              startId:clickedFace
          })
      }else if (event.type === "contextmenu"){//contexmenu means right button is clicked
          setPathFindingVariables({
              ...pathFindingVariables,
              endId:clickedFace
          })
      }
  }

  return (
    <div className='flex'>
        <div ref={canvasHolder} className='canvas_older' onClick={canvasClicked} onContextMenu={canvasClicked}
          onMouseDown={startCounter}
          onMouseUp={stopCounter}
        ></div>
        <div className='settings_holder'>
            <BackButton url={'/'}/>
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