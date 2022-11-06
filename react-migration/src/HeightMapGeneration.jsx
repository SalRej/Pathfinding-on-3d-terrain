import React , {useState , useEffect , useRef , useContext} from 'react';

import HeightMapSettings from './HeightMapSettings';
import createHeightMap from '../scripts/heightMapGeneration/createHightMap';
import worldDataContext from './contex';
import BackButton from './BackButton';

import getTriangleClicked from '../scripts/getTriangleClicked';
import findPath from '../scripts/graph/findPath';
function HeightMapGeneration() {
  
  const canvasHolder = useRef(null);
  const initialRender = useRef(true);
  const {THREEScene ,setTHREEScene, pathFindingVariables, setPathFindingVariables,isTerraforming} = useContext(worldDataContext);

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

    animate();
  },[]);

  function animate() {
    requestAnimationFrame( animate );
    THREEScene.controls.update();
    THREEScene.renderer.render( THREEScene.scene, THREEScene.camera );
  };

  useEffect(()=>{
    if(initialRender.current===true){
        initialRender.current=false;
        THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh'));
    }
    else if(initialRender.current===false){
      THREEScene.scene.remove(THREEScene.scene.getObjectByName('worldMesh'));
      THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh'));
        
        const graph = createHeightMap(heightMapVariables,THREEScene.scene);
        setPathFindingVariables({
          startId:-1,
          endId:-1,
          isEnagled:false,
          graph:graph
      })
    }
  },[heightMapVariables]);

  useEffect(()=>{
    if(isTerraforming===true){
        const {controls} = THREEScene;
        controls.enabled = false;
        setTHREEScene({
            ...THREEScene,
            controls:controls
        })
    }
    else{
        const {controls} = THREEScene;
        controls.enabled = true;
        setTHREEScene({
            ...THREEScene,
            controls:controls
        })
    }
  },[isTerraforming])

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

  useEffect(()=>{

    if(pathFindingVariables.isEnagled===true
        &&pathFindingVariables.startId!=-1
        &&pathFindingVariables.endId!=-1)
      {

        const isThereAPath = findPath(pathFindingVariables,THREEScene.scene);
        if(isThereAPath===null){
          alert("No path was found");
        }
      }

    },[pathFindingVariables.startId,pathFindingVariables.endId]);

    const canvasClicked = (event)=>{
      const {camera,renderer,scene} = THREEScene;
      const clickedFace = getTriangleClicked(event,renderer,camera,scene);

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
        <div ref={canvasHolder} className='canvas_older' onClick={canvasClicked} onContextMenu={canvasClicked}></div>
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