import React , {useContext} from 'react'
import worldDataContext from './contex';
function PathSettings(){

    const {setPathFindingVariables , pathFindingVariables, setIsTerraforming} = useContext(worldDataContext);
    const handleClick =()=>{
        setPathFindingVariables({
            ...pathFindingVariables,
            isEnagled:!pathFindingVariables.isEnagled
        });
        setIsTerraforming(false);
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
                    <li>Start and end points must be selected</li>    
                    <li>When working with high resolution map , pahtfinding my take a few seconds</li>
                    <li>If terrafoming is enabled you cant use pathfinding</li>
                </ul>
            </div>

            <button onClick={handleClick}
                className={pathFindingVariables.isEnagled===true?"enabled":"disabled"}>
                {pathFindingVariables.isEnagled===false?"Enable Pathfinding":"Disable Pathfinding"}
            </button>
        </main>
    )
}

export default PathSettings