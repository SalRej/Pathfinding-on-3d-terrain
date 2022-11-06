import { useContext } from 'react';
import {useEffect} from 'react'
import worldDataContext from '../contex';
function useTriggerControls(){

    const {THREEScene,setTHREEScene,terraformingVariables} = useContext(worldDataContext);
    useEffect(()=>{
        if(terraformingVariables.isEnabled===true){
            const {controls} = THREEScene;
            controls.enabled = false;
            setTHREEScene({
                ...THREEScene,
                controls:controls
            })
        }
        else{
            const {controls} = THREEScene;
            controls.enabled = true;
            setTHREEScene({
                ...THREEScene,
                controls:controls
            })
        }
    },[terraformingVariables.isEnabled])
}

export default useTriggerControls