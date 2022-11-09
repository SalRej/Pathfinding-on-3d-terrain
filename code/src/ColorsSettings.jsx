import React from 'react'
import mapping from '../scripts/mapping';
import rgbHex from 'rgb-hex';

function ColorsSettings({colorValues}){
    

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
                            console.log(colorAndValue)
                            return(
                                <div className='single_color_holder'>
                                    <input type="color" value={sRGBtoHex(colorAndValue.color)}></input>
                                    <input type='range' min={0} max = {1} step={0.01} value={colorAndValue.value} onChange={handleColorHeightChange}></input>
                                    <p>{colorAndValue.value}</p>
                                    <img src='remove.png'></img>
                                </div>
                            )
                        })
                    }
                </div>
            </form>
        </main>
    )
}

export default ColorsSettings