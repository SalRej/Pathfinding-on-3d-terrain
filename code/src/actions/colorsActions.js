export const addColor = ()=>{
    return {
        type:'ADD_COLOR'
    }
}

export const removeColor = ()=>{
    return {
        type:'REMOVE_COLOR'
    }
}

export const changeColorHeight = () =>{
    return {
        type:'CHANGE_COLOR_HEIGHT'
    }
}

export const changeColor = (id,value) =>{
    return {
        type:'CHANGE_COLOR',
        payload:{
            id:id,
            value:value
        }
    }
}

export const resetColors = () =>{
    return {
        type:'RESET_COLORS'
    }
}