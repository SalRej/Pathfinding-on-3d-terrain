const initialState = {
    startId:-1,
    endId:-1,
    isEnabled:false,
    graph:[]
};

const pathFindingVariablesReducer = (state = initialState,action) =>{
    switch(action.type){
        case 'TOOGLE_PATHFINDING':
            return {...state,isEnabled:action.payload}
        case 'SET_GRAPH':
            return {...state,graph:action.payload}
        case 'SET_START':
            return {...state,startId:action.payload}
        case 'SET_END':
            return {...state,endId:action.payload}
        case "RESET_WITHOUT_GRAPH":
            return{
                ...state,
                startId:-1,
                endId:-1,
                isEnabled:false
            }
        case 'RESET':
            return {
                startId:-1,
                endId:-1,
                isEnabled:false,
                graph:[]
            };
        default:
            return {...state};
    }
}

export default pathFindingVariablesReducer;