import defaultColors from "../../scripts/defaultColorValues";
import hexRgb from 'hex-rgb';
import mapping from "../../scripts/mapping";
const changeColor = (state,id,value) =>{
    const colorRGB = hexRgb(value);
    const r = mapping(colorRGB.red,0,255,0,1);
    const g = mapping(colorRGB.green,0,255,0,1);
    const b = mapping(colorRGB.blue,0,255,0,1);

    const color = {r:r,g:g,b:b};
    state =  state.map((colorAndValue)=>{
        if(id===colorAndValue.id){
            return {
                ...colorAndValue,
                color:color
            }
        }
        return colorAndValue;
    })

    return state;
}

const changeColorHeight = (state,id,value) =>{
    state = state.map((colorAndValue)=>{
        const currentId = colorAndValue.id;
        if(id===currentId){
            return {
                ...colorAndValue,
                value:Number(value)
            }
        }
        return colorAndValue;
    })

    return state;
}

const removeColor =(state,id)=>{
    state = state.filter(color=>{
        return color.id != id;
    })

    return state;
}
const colorsReducer = (state = defaultColors,action) =>{
    switch(action.type){
        case "ADD_COLOR":{
            return;
        }
        case "REMOVE_COLOR":{
            const id = action.payload;
            return removeColor(state,id);
        }
        case "CHANGE_COLOR_HEIGHT":{
            const {id,value} = action.payload;
            return changeColorHeight(state,id,value);
        }
        case "CHANGE_COLOR":{
            const {id,value} = action.payload;
            return changeColor(state,id,value);
        }
        case "RESET_COLORS":
            return {state:defaultColors};
        default : return state;
    }
}

export default colorsReducer;