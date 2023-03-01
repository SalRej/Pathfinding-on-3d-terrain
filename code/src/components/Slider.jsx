import React from 'react'

function Slider({min,max,step,name,value}) {
  return (
    <div className='slider'>
        <label htmlFor={name}>{name}:{value}</label>
        <div className='flex'>
            <p>{min}</p>
            <input id={name} type="range" min={min} max={max} value={value} step={step} name={name}></input>
            <p>{max}</p>
        </div>
    </div>
  )
}

export default Slider