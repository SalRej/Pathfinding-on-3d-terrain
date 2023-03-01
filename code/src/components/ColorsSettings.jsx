import React from 'react'
import mapping from '../../scripts/mapping';
import rgbHex from 'rgb-hex';

import useHandleGenerationChange from '../hooks/useHandleGenerationChange';
import EnterColorForm from './EnterColorForm';
import { useState } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { changeColor , changeColorHeight , removeColor} from '../actions/colorsActions';

function ColorsSettings({generationVariables}){
    const colorValues = useSelector(state => state.colorValues);
    const dispatch = useDispatch();

    const [showForm,setShowForm] = useState(false);

    useHandleGenerationChange(false,generationVariables,colorValues);

    
    const handleColorChange = (event) =>{
        const {type,value} = event.target;
        switch(type){
            case "range":{
                const id = Number(event.target.dataset.heightId);
                dispatch(changeColorHeight(id,value));
                break;
            }
            case "color":{
                const id = Number(event.target.dataset.colorId);
                dispatch(changeColor(id,value));
                break;
            }
        }
    }
    
    const handleShowForm = () =>{
        setShowForm(true);
        document.body.classList='blur';
    }
    
    const handleRemoveColor = (id) =>{
        dispatch(removeColor(id));
    }

    const sRGBtoHex = (color) =>{
        const r = mapping(color.r,0,1,0,255);
        const g = mapping(color.g,0,1,0,255);
        const b = mapping(color.b,0,1,0,255);
        return "#" + rgbHex(r,g,b);
    }
    return (
        <React.Fragment>
            <main>
                <form>
                    <div className='color_values_holder'>
                        <p>Color settings</p>
                        {
                            colorValues.sort((a,b)=>a.id-b.id).map(colorAndValue=>{
                                return(
                                    <div className='single_color_holder'>
                                        <input 
                                            data-color-id={colorAndValue.id}
                                            onChange = {handleColorChange}
                                            type="color" 
                                            value={sRGBtoHex(colorAndValue.color)}
                                        >
                                        </input>
                                        <input 
                                            onChange={handleColorChange}
                                            data-height-id={colorAndValue.id} 
                                            type='range' 
                                            min={0} 
                                            max = {1} 
                                            step={0.01} 
                                            value={colorAndValue.value} 
                                        >
                                        </input>
                                        <p>{colorAndValue.value}</p>
                                        <img onClick = {()=>handleRemoveColor(colorAndValue.id)} src='remove.png'></img>
                                    </div>
                                )
                            })
                        }
                    </div>
                </form>
                <button className="add_color_button" onClick={handleShowForm}>Add Color 
                    <img src='add-icon.png'></img>
                </button>

            </main>
            {
                showForm===true && <EnterColorForm setShowForm={setShowForm} />
            }
        </React.Fragment>
    )
}

export default ColorsSettings