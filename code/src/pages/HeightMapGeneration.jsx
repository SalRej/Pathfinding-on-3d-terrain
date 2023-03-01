import React , {useState , useRef} from 'react';

import HeightMapSettings from '../components/HeightMapSettings';
import createHeightMap from '../../scripts/heightMapGeneration/createHightMap';
import BackButton from '../components/BackButton';

import useTriggerControls from '../hooks/useTriggerControls';
import useHandleGenerationChange from '../hooks/useHandleGenerationChange';
import useOnPathChange from '../hooks/useOnPathChange';
import useOnButtonHold from '../hooks/useOnButtonHold';
import useOnLoad from '../hooks/useOnLoad';

import leftOrRightClickOnCanvas from '../../scripts/leftOrRightClickOnCanvas';
import {useSelector , useDispatch} from 'react-redux';
import { setStart,setEnd } from '../actions/pathFindingActions';

function HeightMapGeneration() {
  
  const canvasHolder = useRef(null);
  const initialRender = useRef(true);
  const mouseX = useRef(null);
  const mouseY = useRef(null);

  const pathFindingVariables = useSelector(state => state.pathFindingVariables);
  const terraformingVariables = useSelector(state => state.terraformingVariables);
  const THREEScene = useSelector(state => state.THREEScene);
  const colorValues = useSelector(state => state.colorValues);

  const dispatch = useDispatch();

  const [heightMapVariables,setHeightMapVariables] = useState({
    numPointsX:100,
    numPointsY:100,
    scaleY:20,
    image:new Image()
  })

  useOnLoad(createHeightMap,heightMapVariables,canvasHolder,mouseX,mouseY);

  useTriggerControls();
  useHandleGenerationChange(initialRender,createHeightMap,heightMapVariables,colorValues);
  useOnPathChange();

  const {startCounter,stopCounter} = useOnButtonHold(mouseX,mouseY,heightMapVariables.scaleY);

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
    const clickAndFace = leftOrRightClickOnCanvas(event,THREEScene,terraformingVariables,pathFindingVariables);
        if(clickAndFace === null){
            return;
        }
        const {click,face} = clickAndFace;
        if(click==='left'){
            dispatch(setStart(face));
        }
        if(click ==='right'){
            dispatch(setEnd(face));
        }
  }

  return (
    <div className='flex'>
        <div ref={canvasHolder} className='canvas_older' onClick={canvasClicked} onContextMenu={canvasClicked}
          onMouseDown={startCounter}
          onMouseUp={stopCounter}
          onTouchStart={startCounter}
          onTouchEnd={stopCounter}
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