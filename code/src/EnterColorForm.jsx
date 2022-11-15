import React from 'react'
import { useRef } from 'react';
import mapping from '../scripts/mapping';
import hexRgb from 'hex-rgb';
import { useDispatch } from 'react-redux';
import {addColor} from './actions/colorsActions';
function EnterColorForm({setShowForm}) {

    const colorHeight = useRef(null);
    const colorHex = useRef(null);
    const dispatch = useDispatch();

    const handleAddColor = (event) =>{
        event.preventDefault();
        if(colorHeight.current===null || colorHex===null){
            return;
        }
        if(colorHeight.current.value===''){
            return;
        }

        const colorRGB = hexRgb(colorHex.current.value);
        const color={
            r:mapping(colorRGB.red,0,255,0,1),
            g:mapping(colorRGB.green,0,255,0,1),
            b:mapping(colorRGB.blue,0,255,0,1)
        };

        dispatch(addColor(color,colorHeight.current.value));

        closeForm();
    }

    const closeForm =()=>{
        document.body.classList.remove('blur');
        setShowForm(false);
    }
  return (
    <form onSubmit={handleAddColor} className='enter_color_form' id="test">
        <header>
            <img onClick={closeForm} src='remove.png'></img>
        </header>
        <div>
            <label htmlFor='colorHeight'>Height value</label>
            <input ref={colorHeight} id='colorHeight' type="number" min={0} max={1} step=".01"></input>
        </div>
        <div>
            <label htmlFor='pickColor'>Pick Color</label>
            <input ref={colorHex} id="pickColor" type='color'></input>
        </div>
        <button>Add Color</button>
    </form>
  )
}

export default EnterColorForm