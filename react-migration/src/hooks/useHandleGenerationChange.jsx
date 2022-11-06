import {useEffect , useRef} from 'react'

function useHandleGenerationChange(initialRender,THREEScene,setPathFindingVariables,generationFunction,generationVariables){
    
    if(initialRender === undefined){
        return;
    }

    useEffect(()=>{
        if(initialRender.current==true){
            initialRender.current=false;
        }
        else if(initialRender.current==false){
            THREEScene.scene.remove(THREEScene.scene.getObjectByName('worldMesh'));
            THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh'));
            
            const graph = generationFunction(generationVariables,THREEScene.scene);

            setPathFindingVariables({
                startId:-1,
                endId:-1,
                isEnagled:false,
                graph:graph
            })
        }
    },[generationVariables]);
}

export default useHandleGenerationChange