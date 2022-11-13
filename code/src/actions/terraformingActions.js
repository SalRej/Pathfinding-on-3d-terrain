export const enagbe = ()=>{
    return {
        type:"ENABLE"
    }
}
export const disable =()=>{
    return {
        type:"DISABLE"
    }
}

export const setBrushSize = (brushSize)=>{
    return{
        type:"SET_BRUSH_SIZE",
        payload:brushSize
    }
}

export const setBrushStrength = (brushStrength)=>{
    return {
        type:"SET_BRUSH_STRENGTH",
        payload:brushStrength
    }
}