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