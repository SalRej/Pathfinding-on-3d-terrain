import React , {useState , useEffect , useRef ,useContext } from 'react'
import NoiseGeneratorSettings from './NoiseGeneratorSettings';
import worldDataContext from './contex';

import createNoiseMap from '../scripts/createNoiseMap';
import getTriangleClicked from '../scripts/getTriangleClicked';
import findPath from '../scripts/findPath';

function NoiseGeneration() {

    const canvasHolder = useRef(null);
    const initialRender = useRef(true);

    const {THREEScene , pathFindingVariables, setPathFindingVariables} = useContext(worldDataContext);

     const [generationVariables,setGenerationVariables] = useState({
        width:100,
        height:100,
        scale:70,
        octaves:4,
        persistance:0.5,
        lacunarity:2,
        offsetX:0,
        offsetY:0,
        scaleY:20,
        seed:String(Math.floor(Math.random()*100000))
    })

    useEffect(()=>{

        if(canvasHolder.current!=null){
           canvasHolder.current.appendChild(THREEScene.current.renderer.domElement);
        }
        
        const graph = createNoiseMap(generationVariables,THREEScene.current.scene,true);

        setPathFindingVariables({
            ...pathFindingVariables,
            graph:graph
        })

        animate();
      },[]);

    function animate() {
        requestAnimationFrame( animate );
        THREEScene.current.controls.update();
        THREEScene.current.renderer.render( THREEScene.current.scene, THREEScene.current.camera);
    };

    useEffect(()=>{
        if(initialRender.current==true){
            initialRender.current=false;
        }
        else if(initialRender.current==false){
            THREEScene.current.scene.remove(THREEScene.current.scene.getObjectByName('worldMesh'));
            THREEScene.current.scene.remove(THREEScene.current.scene.getObjectByName('pathMesh'));
            const graph = createNoiseMap(generationVariables,THREEScene.current.scene,false);
            setPathFindingVariables({
                ...pathFindingVariables,
                graph:graph
            })
        }
    },[generationVariables]);

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