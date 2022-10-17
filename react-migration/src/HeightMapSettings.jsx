import React from 'react'
import Slider from './Slider';
function HeightMapSettings({heightMapVariables , handleHeightMapSettings , loadImage , changeResolution}) {

  const handleChange = (event) =>{
    handleHeightMapSettings(event);
  }

  const handleFileInput =(event) =>{
    loadImage(event.target.files);
  }

  const handleResolutionChange =(event)=>{
    const numberValue = Number(event.target.value)
    changeResolution(numberValue);
  }
  return (
    <div className='controls'>
      <p className='heading'>World generation settings</p>

      <form onChange={handleResolutionChange}>
        <Slider min={0} max={500} step={1} name={"resolution"} value={heightMapVariables.numPointsX}/>
      </form>

      <form onChange={handleChange}>
        <Slider min={0} max={50} step={1} name={"scaleY"} value={heightMapVariables.scaleY}/>
        <p>Choose an image</p>
        <input type='file' accept="image/png, image/jpeg" onChange={handleFileInput}></input>
      </form>
    </div>
  )
}

export default HeightMapSettings