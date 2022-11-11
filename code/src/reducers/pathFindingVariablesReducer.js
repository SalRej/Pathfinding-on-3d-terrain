const initialState = {
    startId:-1,
    endId:-1,
    isEnabled:false,
    graph:[]
};

const pathFindingVariablesReducer = (state = initialState,action) =>{
    switch(action.type){
        case 'DISABLE':
            return {...state,isEnabled:false}
        case 'ENABLE':
            return {...state,isEnabled:true}
        case 'SET_GRAPH':
            return {...state,graph:action.payload}
        case 'SET_START':
            return {...state,startId:action.payload}
        case 'SET_END':
            console.log('s')
            return {...state,endId:action.payload}
        default:
            return {...state};
    }
}

export default pathFindingVariablesReducer;