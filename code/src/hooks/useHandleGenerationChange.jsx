import { useContext } from 'react';
import {useEffect} from 'react'
import worldDataContext from '../contex';

const compare =(a,b)=>{
    return a.value - b.value;
}
function useHandleGenerationChange(initialRender,generationFunction,generationVariables,colorValues){
    
    const {THREEScene,setPathFindingVariables} = useContext(worldDataContext);
    if(initialRender === undefined){
        return;
    }

    useEffect(()=>{
        // console.log(colorValues.length)
        if(initialRender.current==true){
            initialRender.current=false;
        }
        else if(initialRender.current==false){
            colorValues.sort(compare);
            THREEScene.scene.remove(THREEScene.scene.getObjectByName('worldMesh'));
            THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh'));
            
            const graph = generationFunction(generationVariables,colorValues,THREEScene.scene);

            setPathFindingVariables({
                startId:-1,
                endId:-1,
                isEnagled:false,
                graph:graph
            })
        }
    },[generationVariables,colorValues]);
}

export default useHandleGenerationChange