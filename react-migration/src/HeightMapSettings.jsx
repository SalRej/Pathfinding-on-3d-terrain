import React , {useState} from 'react'
import Slider from './Slider';
import PathSettings from './PathSettings';
import ExportFile from './ExportFile';
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
  const [chosenTab , setChosenTab] = useState("settings");

  return (
    <div className='controls'>
      <p className='heading'>World generation settings</p>
      <nav>
          <p className={chosenTab==="settings"?"chosen":""} onClick={()=>setChosenTab("settings")}>Generation</p>
          <p className={chosenTab==="path"?"chosen":""} onClick={()=>setChosenTab("path")}>Find path</p>
          <p className={chosenTab==="export"?"chosen":""} onClick={()=>setChosenTab("export")}>Export</p>
      </nav>

      {
        chosenTab==="settings" &&
        <main>
          <form onChange={handleResolutionChange}>
            <Slider min={20} max={500} step={1} name={"resolution"} value={heightMapVariables.numPointsX}/>
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
        <PathSettings />
      }
      {
        chosenTab==='export' &&
        <ExportFile />
      }
    </div>
  )
}

export default HeightMapSettings