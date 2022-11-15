import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGraph } from '../actions/pathFindingActions';
import { sortByValue } from '../actions/colorsActions';

function useHandleGenerationChange(initialRender,generationFunction,generationVariables,colorValues){
    
    const dispatch = useDispatch();
    const THREEScene = useSelector(state => state.THREEScene);
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
            
            dispatch(sortByValue());
            const graph = generationFunction(generationVariables,colorValues,THREEScene.scene);

            dispatch(setGraph(graph));
        }
    },[generationVariables,colorValues]);
}

export default useHandleGenerationChange