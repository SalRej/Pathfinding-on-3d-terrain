import React , {useState , useEffect , useRef , useContext} from 'react'
import HeightMapSettings from './HeightMapSettings';

import createHeightMap from '../scripts/createHightMap';
import worldDataContext from './contex';
function HeightMapGeneration() {
  
  const canvasHolder = useRef(null);
  const initialRender = useRef(true);
  const {THREEScene , pathFindingVariables, setPathFindingVariables , setIsPathfindingEnabled} = useContext(worldDataContext);

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
        THREEScene.current.scene.remove(THREEScene.current.scene.getObjectByName('worldMesh'));
        const graph = createHeightMap(heightMapVariables,THREEScene.current.scene);
        setPathFindingVariables({
          ...pathFindingVariables,
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