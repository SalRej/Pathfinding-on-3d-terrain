export const tooglePathFinding = (isEnabled) =>{
    return {
        type:"TOOGLE_PATHFINDING",
        payload:isEnabled
    }
}

export const setGraph = (newGraph) =>{
    return{
        type:"SET_GRAPH",
        payload:newGraph
    }
}

export const setStart = (startId) =>{
    return{
        type:'SET_START',
        payload:startId
    }
}

export const setEnd = (endId) =>{
    return{
        type:'SET_END',
        payload:endId
    }
}

export const resetPathfinding = () =>{
    return {
        type:'RESET'
    }
}

export const resetWithoutGraph = () =>{
    return {
        type:"RESET_WITHOUT_GRAPH"
    }
}