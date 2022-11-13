const initialState = {
    isEnabled:false,
    brushRadius:10,
    brushStrength:0.5
}
const terraforminVariablesReducer = (state = initialState,action) =>{

    switch(action.type){
        case "TOOGLE_TERRAFORMING":
            return {...state,isEnabled:action.payload}
        case "SET_BRUSH_SIZE":
            return {...state,brushRadius:action.payload}
        case "SET_BRUSH_STRENGTH":
            return {...state,brushStrength:action.payload}
        case "RESET":
            return {
                isEnabled:false,
                brushRadius:10,
                brushStrength:0.5
            };
        default : return state;
    }
}

export default terraforminVariablesReducer;