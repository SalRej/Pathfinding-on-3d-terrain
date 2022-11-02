import {useRef} from 'react'
import terraform from '../../scripts/terraforming/terraform';
import getTriangleClicked from '../../scripts/getTriangleClicked';
import worldDataContext from '../contex';
import { useContext } from 'react';
function useOnButtonHold(mouseX,mouseY,scaleY){

    const {THREEScene,terraformingVariables,pathFindingVariables} = useContext(worldDataContext);

    const intervalRef = useRef(null);
    const startCounter = (event) => {

        if (intervalRef.current) return;
        if(terraformingVariables.isEnabled===false) return;

        intervalRef.current = setInterval(() => {

          const {renderer,scene,camera} = THREEScene;

          const triangleId = getTriangleClicked(mouseX.current,mouseY.current,renderer,camera,scene);
          if(event.button===0){//left button for pc
            terraform(triangleId,THREEScene,pathFindingVariables,scaleY,true,terraformingVariables);
          }
          else if(event.button===2){//right button for pc
            terraform(triangleId,THREEScene,pathFindingVariables,scaleY,false,terraformingVariables);
          }
          else if(event.type='touchstart'){//touch for mobile
            terraform(triangleId,THREEScene,pathFindingVariables,scaleY,true,terraformingVariables);
          }
          
        }, 10);
    };
    
    const stopCounter = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return{
        startCounter,
        stopCounter
    }
}

export default useOnButtonHold