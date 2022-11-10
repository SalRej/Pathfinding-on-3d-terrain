const pathFindingVariablesReducer = (state = {
    startId:-1,
    endId:-1,
    isEnagled:false,
    graph:[]

},action) =>{
    switch(action.type){
        case 'DISABLE':
            return {
                ...state,
                isEnabled:false
            }
        case 'ENABLE':
            return {
                ...state,
                isEnabled:true
            }
        case 'SET_GRAPH':{
            return{
                ...state,
                graph:action.payload
            }
        }
        default: return state;
    }
}

export default pathFindingVariablesReducer;