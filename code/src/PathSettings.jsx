import React , {useContext} from 'react'
import worldDataContext from './contex';
import {useSelector, useDispatch} from 'react-redux';
import {enable , disable} from '../src/actions/pathFindingActions';
function PathSettings(){

    const dispatch = useDispatch();
    const pathFindingVariables = useSelector(state => state.pathFindingVariables);

    const {terraformingVariables, setTerraformingVariables} = useContext(worldDataContext);
    const handleClick =()=>{

        if(pathFindingVariables.isEnabled===true){
            dispatch(disable())
        }else if(pathFindingVariables.isEnabled===false){
            dispatch(enable());
        }

        setTerraformingVariables({
            ...terraformingVariables,
            isEnabled:false
        })
    }
    return (
        <main>
            <div className='start-end'>
                <p>Start: {pathFindingVariables.startId===-1?"none":pathFindingVariables.startId}</p>
                <p>End: {pathFindingVariables.endId===-1?"none":pathFindingVariables.endId}</p>
            </div>

            <div className='info'>
                <img src="icons8-info-24.png"></img>
                <ul>
                    <li>Press left mouse button to place a start point</li>
                    <li>Press right mouse button to place an end point</li>
                    <li>If you are using the mobile hold for a few seconds to place an end point</li>
                    <li>Start and end points must be selected</li>    
                    <li>When working with high resolution map , pahtfinding my take a few seconds</li>
                </ul>
            </div>

            <button onClick={handleClick}
                className={pathFindingVariables.isEnabled===true?"enabled":"disabled"}>
                {pathFindingVariables.isEnabled===false?"Enable Pathfinding":"Disable Pathfinding"}
            </button>
        </main>
    )
}

export default PathSettings