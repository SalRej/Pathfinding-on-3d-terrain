import React from 'react'

function HeightMapSettings({heightMapVariables , handleHeightMapSettings}) {

  const handleChange = (event) =>{
    handleHeightMapSettings(event);
  }

  return (
    <div>
      <form onChange={handleChange}>
        <p>resolution:{heightMapVariables.numPointsX}</p>
        <input type='range' min={2} max={1000} value={heightMapVariables.numPointsX}></input>

        <p>ScaleY:{heightMapVariables.scaleY}</p>
        <input type='range' min={0} max={50} name="scaleY" value={heightMapVariables.scaleY} ></input>
        
      </form>
    </div>
  )
}

export default HeightMapSettings