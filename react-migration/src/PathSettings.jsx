import React from 'react'

function PathSettings({pathFindingVariables, findPath , handlePathSettings}){

    const handleFindPath = () =>{
        findPath();
    }
    const handlePositionChange = (event) =>{
        handlePathSettings(event.target.value);
    }
    return (
        <main>
            <span>Start: {pathFindingVariables.startId===-1?"Chose Start":pathFindingVariables.startId}</span>
            <span>End: {pathFindingVariables.endId===-1?"Chose End":pathFindingVariables.endId}</span>

            <form>
                <input onChange={handlePositionChange} type="radio" id="start" name='positions' value='start'></input>
                <label htmlFor="start">Start</label>

                <input onChange={handlePositionChange} type="radio" id="end" name='positions' value='end'></input>
                <label htmlFor="end">End</label>
            </form>

            <button onClick={handleFindPath}>Find Path</button>
        </main>
    )
}

export default PathSettings