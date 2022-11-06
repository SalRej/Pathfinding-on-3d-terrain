import React , {useState , useEffect , useRef , useContext} from 'react'
import HeightMapSettings from './HeightMapSettings';

import createHeightMap from '../scripts/createHightMap';
import worldDataContext from './contex';
import getTriangleClicked from '../scripts/getTriangleClicked';
import findPath from '../scripts/findPath';
function HeightMapGeneration() {
  
  const canvasHolder = useRef(null);
  const initialRender = useRef(true);
  const {THREEScene , pathFindingVariables, setPathFindingVariables} = useContext(worldDataContext);

  const [heightMapVariables,setHeightMapVariables] = useState({
    numPointsX:100,
    numPointsY:100,
    scaleY:20,
    image:new Image()
  })

  useEffect(()=>{

    if(canvasHolder.current!=null){
       canvasHolder.current.appendChild(THREEScene.current.renderer.domElement);
    }

    const graph = createHeightMap(heightMapVariables,THREEScene.current.scene);

    setPathFindingVariables({
      ...pathFindingVariables,
      graph:graph
    })
    animate();
  },[]);

  function animate() {
    requestAnimationFrame( animate );
    THREEScene.current.controls.update();
    THREEScene.current.renderer.render( THREEScene.current.scene, THREEScene.current.camera );
  };

  useEffect(()=>{
    if(initialRender.current==true){
        initialRender.current=false;
    }
    else if(initialRender.current==false){
        const {scene} = THREEScene.current;
        scene.remove(scene.getObjectByName('worldMesh'));
        scene.remove(scene.getObjectByName('pathMesh'));
        const graph = createHeightMap(heightMapVariables,THREEScene.current.scene);
        setPathFindingVariables({
          ...pathFindingVariables,
          startId:-1,
          endId:-1,
          graph:graph
      })
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
    setHeightMapVariables({
      ...heightMapVariables,
      numPointsX:value,
      numPointsY:value
    })
  }

  useEffect(()=>{
    if(pathFindingVariables.isEnagled===true
        &&pathFindingVariables.startId!=-1
        &&pathFindingVariables.endId!=-1){
        findPath(pathFindingVariables,THREEScene.current.scene);
      }
    },[pathFindingVariables.startId,pathFindingVariables.endId]);


  const canvasClicked = (event)=>{
    const {camera,renderer,scene} = THREEScene.current;
    const clickedFace = getTriangleClicked(event,renderer,camera,scene);

    if(clickedFace===null)
        return;

    if(pathFindingVariables.isEnagled===false)
        return;
      if(pathFindingVariables.graph[clickedFace].isObstical===true)
        return;

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
    <div className='flex' style={{display:"flex"}}>
        <div ref={canvasHolder} className='canvas_older' onClick={canvasClicked} onContextMenu={canvasClicked}></div>
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