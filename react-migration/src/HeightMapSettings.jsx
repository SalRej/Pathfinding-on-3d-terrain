import React , {useState} from 'react'
import Slider from './Slider';
import PathSettings from './PathSettings';
function HeightMapSettings({heightMapVariables , handleHeightMapSettings , loadImage , changeResolution , pathFindingVariables , setIsPathfindingEnabled}) {

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
  const [chosenTab , setChosenTab] = useState("settings");

  return (
    <div className='controls'>
      <p className='heading'>World generation settings</p>
      <nav>
          <p className={chosenTab==="settings"?"chosen":""} onClick={()=>setChosenTab("settings")}>Generation</p>
          <p className={chosenTab==="path"?"chosen":""} onClick={()=>setChosenTab("path")}>Find path</p>
      </nav>

      {
        chosenTab==="settings" &&
        <main>
          <form onChange={handleResolutionChange}>
            <Slider min={0} max={500} step={1} name={"resolution"} value={heightMapVariables.numPointsX}/>
          </form>

          <form onChange={handleChange}>
            <Slider min={0} max={50} step={1} name={"scaleY"} value={heightMapVariables.scaleY}/>
            <p>Choose an image</p>
            <input type='file' accept="image/png, image/jpeg" onChange={handleFileInput}></input>
          </form>
        </main>
      }
      {
        chosenTab==="path" &&
        <PathSettings 
            pathFindingVariables={pathFindingVariables}
            setIsPathfindingEnabled={setIsPathfindingEnabled}
        />
      }
    </div>
  )
}

export default HeightMapSettings