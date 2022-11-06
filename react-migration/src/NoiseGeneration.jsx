import React , {useState , useEffect , useRef } from 'react'
import NoiseGeneratorSettings from './NoiseGeneratorSettings';

import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createNoiseMap from '../scripts/createNoiseMap';
import mouseClick from '../scripts/mouseClick';

function NoiseGeneration() {

    const scene = useRef(); 
    const camera = useRef ();
    const renderer = useRef();
    const controls = useRef();
    const canvasHolder = useRef(null);
    const initialRender = useRef(true);

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

    const [pathFindingVariables,setPathFindingVariables] = useState({
        startId:-1,
        endId:-1,
        setCurrent:"none"
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
        
        window.addEventListener("click",handleMouseClick);
        createNoiseMap(generationVariables,scene.current,true);
        animate();
      },[]);

    function animate() {
        requestAnimationFrame( animate );
        controls.current.update();
        renderer.current.render( scene.current, camera.current );

        // vizualize the pathfinding
        // if(pathData.current.vizualizingGeometry!=undefined){
        //     animatePathFinding(vizualizingMesh.current,pathMesh.current,drawRanges.current,scene.current);
        // }
    };

    useEffect(()=>{
        if(initialRender.current==true){
            initialRender.current=false;
        }
        else if(initialRender.current==false){
            scene.current.remove(scene.current.getObjectByName('worldMesh'));
            createNoiseMap(generationVariables,scene.current,false);
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

    const handlePathSettings = (string) =>{
        setPathFindingVariables({
            ...pathFindingVariables,
            current:string
        })
    }
    const handleMouseClick = (event)=>[
        mouseClick(event,renderer.current,camera.current,scene.current)
    ]
    return (
        <div className='flex' style={{display:"flex"}}>
            <div ref={canvasHolder} className='canvas_older'></div>
            <div className='settings_holder'>
                <NoiseGeneratorSettings 
                    generationVariables={generationVariables}
                    pathFindingVariables={pathFindingVariables}
                    handleNoiseSettings={handleNoiseSettings}
                    changeResolution={changeResolution}
                    handlePathSettings={handlePathSettings}
                />
            </div>
        </div>
    )
}

export default NoiseGeneration