import { useContext } from 'react';
import {useEffect} from 'react'
import { useSelector } from 'react-redux';
import worldDataContext from '../contex';
function useTriggerControls(){

    const terraformingVariables = useSelector(state => state.terraformingVariables);
    
    const {THREEScene,setTHREEScene} = useContext(worldDataContext);
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