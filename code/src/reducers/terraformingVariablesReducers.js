const initialState = {
    isEnabled:false,
    brushRadius:10,
    brushStrength:0.5
}
const terraforminVariablesReducer = (state = initialState,action) =>{

    switch(action.type){
        case "ENABLE":
            return {...state,isEnabled:true}
        case "DISABLE":
            return {...state,isEnabled:false}
        case "SET_BRUSH_SIZE":
            return {...state,brushRadius:action.payload}
        case "SET_BRUSH_STRENGTH":
            return {...state,brushStrength:action.payload}
        default : return state;
    }
}