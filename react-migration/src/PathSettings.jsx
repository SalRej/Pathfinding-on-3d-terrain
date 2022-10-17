import React from 'react'

function PathSettings({pathFindingVariables, setIsPathfindingEnabled}){

    const handleClick =()=>{
        setIsPathfindingEnabled(!pathFindingVariables.isEnagled);
    }
    return (
        <main>
            <span>Start: {pathFindingVariables.startId===-1?"none":pathFindingVariables.startId}</span>
            <span>End: {pathFindingVariables.endId===-1?"none":pathFindingVariables.endId}</span>

            <button onClick={handleClick}>{pathFindingVariables.isEnagled===false?"Enable Pathfinding":"Disable Pathfinding"}</button>
        </main>
    )
}

export default PathSettings