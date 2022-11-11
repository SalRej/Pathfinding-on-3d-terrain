import { useContext } from 'react';
import {useEffect} from 'react'
import worldDataContext from '../contex';


import { useDispatch } from 'react-redux';
import { setGraph } from '../actions/pathFindingActions';

const compare =(a,b)=>{
    return a.value - b.value;
}
function useHandleGenerationChange(initialRender,generationFunction,generationVariables,colorValues){
    
    const dispatch = useDispatch();
    const {THREEScene} = useContext(worldDataContext);
    if(initialRender === undefined){
        return;
    }

    useEffect(()=>{
        if(initialRender.current==true){
            initialRender.current=false;
        }
        else if(initialRender.current==false){
            colorValues.sort(compare);
            THREEScene.scene.remove(THREEScene.scene.getObjectByName('worldMesh'));
            THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh'));
            
            const graph = generationFunction(generationVariables,colorValues,THREEScene.scene);

            dispatch(setGraph(graph));
        }
    },[generationVariables,colorValues]);
}

export default useHandleGenerationChange