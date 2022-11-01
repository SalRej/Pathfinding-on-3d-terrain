import React , {useEffect} from 'react'

function useTriggerControls(THREEScene,setTHREEScene,terraformingVariables){

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