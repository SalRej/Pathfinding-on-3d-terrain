import React , {useContext} from 'react'
import mapping from '../scripts/mapping';
import rgbHex from 'rgb-hex';
import hexRgb from 'hex-rgb';

import worldDataContext from './contex';

import useHandleGenerationChange from './hooks/useHandleGenerationChange';
const compare =(a,b)=>{
    return a.id - b.id;
}
function ColorsSettings({generationVariables}){
    const {colorValues,setColorValues} = useContext(worldDataContext);

    useHandleGenerationChange(false,generationVariables,colorValues);

    colorValues.sort(compare);

    const handleColorHeightChange = (event) =>{
        setColorValues((prev)=>{
            return prev.map((colorAndValue)=>{
                const id = colorAndValue.id.toString();
                if(event.target.id===id){
                    return {
                        ...colorAndValue,
                        value:Number(event.target.value)
                    }
                }
                return colorAndValue;
            })
        })
    }
    const handleColorChange = (event) =>{
        const id = Number(event.target.dataset.colorId);
        const colorRGB = hexRgb(event.target.value);
        const r = mapping(colorRGB.red,0,255,0,1);
        const g = mapping(colorRGB.green,0,255,0,1);
        const b = mapping(colorRGB.blue,0,255,0,1);

        const color = {r:r,g:g,b:b};
        setColorValues((prev)=>{
            return prev.map((colorAndValue)=>{
                if(id===colorAndValue.id){
                    return {
                        ...colorAndValue,
                        color:color
                    }
                }
                return colorAndValue;
            })
        })

    }
    const removeColor = (id) =>{
        setColorValues((prev)=>{
            return prev.filter(color=>{
                return color.id != id;
            })
        })
    }

    const sRGBtoHex = (color) =>{
        const r = mapping(color.r,0,1,0,255);
        const g = mapping(color.g,0,1,0,255);
        const b = mapping(color.b,0,1,0,255);
        return "#" + rgbHex(r,g,b);
    }
    return (
        <main>
            <form>
                <div className='color_values_holder'>
                    <p>Color settings</p>
                    {
                        colorValues.map(colorAndValue=>{
                            return(
                                <div className='single_color_holder'>
                                    <input data-color-id={colorAndValue.id} onChange = {handleColorChange} type="color" value={sRGBtoHex(colorAndValue.color)}></input>
                                    <input id={colorAndValue.id} type='range' min={0} max = {1} step={0.01} value={colorAndValue.value} onChange={handleColorHeightChange}></input>
                                    <p>{colorAndValue.value}</p>
                                    <img onClick = {()=>removeColor(colorAndValue.id)} src='remove.png'></img>
                                </div>
                            )
                        })
                    }
                </div>
            </form>
            <button>Add Color 
                <img src='add-icon.png'></img>
            </button>
        </main>
    )
}

export default ColorsSettings