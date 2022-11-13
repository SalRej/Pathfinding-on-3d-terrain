export const enable = () =>{
    return {
        type:'ENABLE'
    }
}

export const disable = () =>{
    return {
        type:"DISABLE"
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

export const reset = () =>{
    return {
        type:'RESET'
    }
}