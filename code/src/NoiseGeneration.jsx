import React , {useState , useEffect , useRef ,useContext } from 'react'
import NoiseGeneratorSettings from './NoiseGeneratorSettings';
import worldDataContext from './contex';
import BackButton from './BackButton';

import useTriggerControls from './hooks/useTriggerControls';
import useHandleGenerationChange from './hooks/useHandleGenerationChange';
import useOnPathChange from './hooks/useOnPathChange';
import useCanvasClicked from './hooks/useCanvasClicked';
import useOnButtonHold from './hooks/useOnButtonHold';
import useOnLoad from './hooks/useOnLoad';

import createNoiseMap from '../scripts/noiseGeneration/createNoiseMap';
function NoiseGeneration() {

    const canvasHolder = useRef(null);
    const initialRender = useRef(true);
    const mouseX = useRef(null);
    const mouseY = useRef(null);

    const {
        THREEScene,
        pathFindingVariables,
        setPathFindingVariables,
        terraformingVariables,
        colorValues
    } = useContext(worldDataContext);

     const [generationVariables,setGenerationVariables] = useState({
        width:100,
        height:100,
        scale:70,
        octaves:7,
        persistance:0.5,
        lacunarity:2,
        offsetX:0,
        offsetY:0,
        scaleY:20,
        seed:String(Math.floor(Math.random()*100000))
    })

    useOnLoad(createNoiseMap,generationVariables,canvasHolder,mouseX,mouseY);

    useTriggerControls();
    useHandleGenerationChange(initialRender,createNoiseMap,generationVariables,colorValues);
    useOnPathChange();
    const {startCounter,stopCounter} = useOnButtonHold(mouseX,mouseY,generationVariables.scaleY);

    const changeResolution = (value) =>{
        setGenerationVariables({
            ...generationVariables,
            ['width']:value,
            ['height']:value
        })
    }
    const handleNoiseSettings = (event)=>{
        setGenerationVariables({
            ...generationVariables,
            [event.target.name]:event.target.value
        })
    }

    const canvasClicked = (event)=>{
        useCanvasClicked(event,THREEScene,terraformingVariables,pathFindingVariables,setPathFindingVariables);
    }

    return (
        <div className='flex'>
            <div ref={canvasHolder} className='canvas_older'  onClick={canvasClicked} onContextMenu={canvasClicked}
            onMouseDown={startCounter}
            onMouseUp={stopCounter}
            onTouchStart={startCounter}
            onTouchEnd={stopCounter}
            ></div>
            <div className='settings_holder'>
                <BackButton url={'/'}/>
                <NoiseGeneratorSettings 
                    generationVariables={generationVariables}
                    handleNoiseSettings={handleNoiseSettings}
                    changeResolution={changeResolution}
                />
            </div>
        </div>
    )
}

export default NoiseGeneration