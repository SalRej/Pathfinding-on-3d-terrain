import React , {useState , useEffect , useRef } from 'react'
import NoiseGeneratorSettings from './NoiseGeneratorSettings';

import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createNoiseMap from '../scripts/createNoiseMap';
import mouseClick from '../scripts/mouseClick';
import djikstra from '../scripts/djikstra';

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
        isEnagled:false,
        graph:[]
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
        
        const graph = createNoiseMap(generationVariables,scene.current,true);

        setPathFindingVariables({
            ...pathFindingVariables,
            graph:graph
        })

        animate();
      },[]);

    function animate() {
        requestAnimationFrame( animate );
        controls.current.update();
        renderer.current.render( scene.current, camera.current );
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

    const findPath = () =>{
        const {startId , endId , graph } = pathFindingVariables;

        if(startId!=-1 && endId!=- 1){
            scene.current.remove(scene.current.getObjectByName("pathMesh"));
            const pathCordinates = djikstra(graph,startId,endId);

            const pathGeometry = new THREE.BufferGeometry();
            pathGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathCordinates.path, 3 ));
            pathGeometry.computeVertexNormals();//needed for light to work
            
            const pathMaterial = new THREE.MeshStandardMaterial( {
                side: THREE.DoubleSide,color:0xff0000
            });

            const pathMesh = new THREE.Mesh( pathGeometry, pathMaterial );
            pathMesh.name = "pathMesh";
            scene.current.add(pathMesh);
        }
    }
    const setIsPathfindingEnabled = (boolean) =>{
        setPathFindingVariables({
            ...pathFindingVariables,
            isEnagled:boolean
        })
    }
    useEffect(()=>{
        if(pathFindingVariables.isEnagled===true){
            findPath();
        }
    },[pathFindingVariables.startId,pathFindingVariables.endId]);

    const canvasClicked = (event)=>{
        const clickedFace = mouseClick(event,renderer.current,camera.current,scene.current);

        if(clickedFace===null)
            return;

        if(pathFindingVariables.isEnagled===false)
            return;

        //click means left button is clicked
        if(event.type === "click"){
            console.log("vleze");
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
                    pathFindingVariables={pathFindingVariables}
                    handleNoiseSettings={handleNoiseSettings}
                    changeResolution={changeResolution}
                    setIsPathfindingEnabled={setIsPathfindingEnabled}
                />
            </div>
        </div>
    )
}

export default NoiseGeneration