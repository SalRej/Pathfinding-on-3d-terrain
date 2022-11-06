import { useContext } from 'react';
import {useEffect} from 'react'
import worldDataContext from '../contex';
function useHandleGenerationChange(initialRender,generationFunction,generationVariables){
    
    const {THREEScene,setPathFindingVariables} = useContext(worldDataContext);
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