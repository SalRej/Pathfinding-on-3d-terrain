import React , {useState , useEffect , useRef ,useContext } from 'react'
import NoiseGeneratorSettings from './NoiseGeneratorSettings';
import worldDataContext from './contex';

import createNoiseMap from '../scripts/createNoiseMap';
import getTriangleClicked from '../scripts/getTriangleClicked';
import findPath from '../scripts/findPath';
import {Link} from 'react-router-dom';
function NoiseGeneration() {

    const canvasHolder = useRef(null);
    const initialRender = useRef(true);

    const {THREEScene , pathFindingVariables, setPathFindingVariables} = useContext(worldDataContext);

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

    useEffect(()=>{
        
        if(canvasHolder.current!=null){
           canvasHolder.current.appendChild(THREEScene.renderer.domElement);
        }
        
        THREEScene.scene.remove(THREEScene.scene.getObjectByName('worldMesh'));
        THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh')); 
        const graph = createNoiseMap(generationVariables,THREEScene.scene,true);

        setPathFindingVariables({
            ...pathFindingVariables,
            graph:graph
        })
        console.log("1");
        animate();
      },[]);

    function animate() {
        requestAnimationFrame( animate );
        THREEScene.controls.update();
        THREEScene.renderer.render( THREEScene.scene, THREEScene.camera);
    };

    useEffect(()=>{
        if(initialRender.current==true){
            initialRender.current=false;
        }
        else if(initialRender.current==false){
            THREEScene.scene.remove(THREEScene.scene.getObjectByName('worldMesh'));
            THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh'));
    
            console.log("2")
            const graph = createNoiseMap(generationVariables,THREEScene.scene,false);
            setPathFindingVariables({
                startId:-1,
                endId:-1,
                isEnagled:false,
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
            findPath(pathFindingVariables,THREEScene.scene);
        }
    },[pathFindingVariables.startId,pathFindingVariables.endId]);

    const canvasClicked = (event)=>{
        const {camera,renderer,scene} = THREEScene;
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
        <div className='flex'>
            <div ref={canvasHolder} className='canvas_older' onClick={canvasClicked} onContextMenu={canvasClicked}></div>
            <div className='settings_holder'>
                <Link to='/'>
                    <button className='go_back_button'>
                        <img></img>
                        <p>GO BACK</p>
                    </button>
                </Link>
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