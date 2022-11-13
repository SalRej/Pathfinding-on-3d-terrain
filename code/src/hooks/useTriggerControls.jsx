import {useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux';
import {enableSceneControls,disableSceneControls} from '../actions/threeSceneActions';
function useTriggerControls(){

    const terraformingVariables = useSelector(state => state.terraformingVariables);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(terraformingVariables.isEnabled===true){
            dispatch(disableSceneControls());
        }
        else{
            dispatch(enableSceneControls());
        }

    },[terraformingVariables.isEnabled])
}

export default useTriggerControls