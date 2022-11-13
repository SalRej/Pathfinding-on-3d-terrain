export const toogleTerraforming =(isEnabled)=>{
    return {
        type:"TOOGLE_TERRAFORMING",
        payload:isEnabled
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

export const resetTerraforming = ()=>{
    return {
        type:"RESET"
    }
}