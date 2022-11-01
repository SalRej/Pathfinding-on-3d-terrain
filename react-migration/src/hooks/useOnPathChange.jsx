import { useContext } from 'react';
import {useEffect} from 'react'
import findPath from '../../scripts/graph/findPath';
import worldDataContext from '../contex';
function useOnPathChange() {

    const {pathFindingVariables,THREEScene} = useContext(worldDataContext);
    useEffect(()=>{
        if(pathFindingVariables.isEnagled===true
            &&pathFindingVariables.startId!=-1
            &&pathFindingVariables.endId!=-1){

            const isThereAPath = findPath(pathFindingVariables,THREEScene.scene);
            if(isThereAPath===null){
                alert("No path was found");
            }
        }
    },[pathFindingVariables.startId,pathFindingVariables.endId]);
}

export default useOnPathChange