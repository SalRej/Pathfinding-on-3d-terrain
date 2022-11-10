const pathFindingVariablesReducer = (state = {
    startId:-1,
    endId:-1,
    isEnagled:false,
    graph:[]
},action) =>{
    switch(action){
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
    }
}