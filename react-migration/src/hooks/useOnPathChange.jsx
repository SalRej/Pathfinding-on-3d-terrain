import {useEffect} from 'react'
import findPath from '../../scripts/graph/findPath';

function useOnPathChange(pathFindingVariables,THREEScene) {
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