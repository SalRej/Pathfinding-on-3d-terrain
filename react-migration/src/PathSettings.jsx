import React from 'react'

function PathSettings({pathFindingVariables, setIsPathfindingEnabled}){

    const handleClick =()=>{
        setIsPathfindingEnabled(!pathFindingVariables.isEnagled);
    }
    return (
        <main>
            <span>Start: {pathFindingVariables.startId===-1?"Chose Start":pathFindingVariables.startId}</span>
            <span>End: {pathFindingVariables.endId===-1?"Chose End":pathFindingVariables.endId}</span>

            <button onClick={handleClick}>Enable Pathfinding</button>
        </main>
    )
}

export default PathSettings