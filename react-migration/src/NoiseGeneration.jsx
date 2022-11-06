import React , {useState , useEffect , useRef ,useContext } from 'react'
import NoiseGeneratorSettings from './NoiseGeneratorSettings';
import worldDataContext from './contex';

import * as THREE from 'three';
import initScene from '../scripts/initScene';
import createNoiseMap from '../scripts/createNoiseMap';
import mouseClick from '../scripts/mouseClick';
import djikstra from '../scripts/djikstra';

function NoiseGeneration() {

    const canvasHolder = useRef(null);
    const initialRender = useRef(true);

    const {THREEScene , pathFindingVariables, setPathFindingVariables , setIsPathfindingEnabled} = useContext(worldDataContext);

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

    const findPath = () =>{
        const {startId , endId , graph } = pathFindingVariables;

        if(startId!=-1 && endId!=- 1){
            THREEScene.current.scene.remove(THREEScene.current.scene.getObjectByName("pathMesh"));
            const pathCordinates = djikstra(graph,startId,endId);

            const pathGeometry = new THREE.BufferGeometry();
            pathGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathCordinates.path, 3 ));
            pathGeometry.computeVertexNormals();//needed for light to work
            
            const pathMaterial = new THREE.MeshStandardMaterial( {
                side: THREE.DoubleSide,color:0xff0000
            });

            const pathMesh = new THREE.Mesh( pathGeometry, pathMaterial );
            pathMesh.name = "pathMesh";
            THREEScene.current.scene.add(pathMesh);
        }
    }

    useEffect(()=>{
        if(pathFindingVariables.isEnagled===true){
            findPath();
        }
    },[pathFindingVariables.startId,pathFindingVariables.endId]);

    const canvasClicked = (event)=>{
        const {camera,renderer,scene} = THREEScene.current;
        const clickedFace = mouseClick(event,renderer,camera,scene);

        if(clickedFace===null)
            return;

        if(pathFindingVariables.isEnagled===false)
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