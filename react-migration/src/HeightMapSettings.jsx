import React from 'react'

function HeightMapSettings({heightMapVariables , handleHeightMapSettings , loadImage}) {

  const handleChange = (event) =>{
    handleHeightMapSettings(event);
  }

  const handleFileInput =(event) =>{
    console.log(event);
    loadImage(event.target.files);
  }
  return (
    <div>
      <form onChange={handleChange}>
        <p>resolution:{heightMapVariables.numPointsX}</p>
        <input type='range' min={2} max={1000} value={heightMapVariables.numPointsX}></input>

        <p>ScaleY:{heightMapVariables.scaleY}</p>
        <input type='range' min={0} max={50} name="scaleY" value={heightMapVariables.scaleY} ></input>
        
        <p>Choose an image</p>
        <input type='file' accept="image/png, image/jpeg" onChange={handleFileInput}></input>
      </form>
    </div>
  )
}

export default HeightMapSettings