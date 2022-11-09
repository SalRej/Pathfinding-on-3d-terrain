import React , { useState } from 'react'
import Slider from './Slider';
import ExportFile from './ExportFile';
import PathSettings from './PathSettings';
import Terraform from './Terraform';
import ColorsSettings from './ColorsSettings';

function NoiseGeneratorControls({generationVariables , handleNoiseSettings , changeResolution ,colorValues}){

    const [chosenTab , setChosenTab] = useState("settings");

    const handleChange = (e) =>{
        handleNoiseSettings(e);
    }
    const handleResolutionChange = (e) =>{
        changeResolution(Number(e.target.value));
    }

    return (
        <div className='controls'>

            <p className='heading'>World generation settings</p>
            <nav>
                <p className={chosenTab==="settings"?"chosen":""} onClick={()=>setChosenTab("settings")}>Generation</p>
                <p className={chosenTab==="color"?"chosen":""} onClick={()=>setChosenTab("color")}>Colors</p>
                <p className={chosenTab==="path"?"chosen":""} onClick={()=>setChosenTab("path")}>Find path</p>
                <p className={chosenTab==="terraform"?"chosen":""} onClick={()=>setChosenTab("terraform")}>Terraform</p>
                <p className={chosenTab==="export"?"chosen":""} onClick={()=>setChosenTab("export")}>Export</p>
            </nav>
            
            {   chosenTab==="settings" &&
                <main>

                    <form onChange={handleResolutionChange}>
                        <Slider min={20} max={200} name='resolution' value={generationVariables.width}/>
                    </form>

                    <form onChange={handleChange}>
                        <Slider min={0} max={200} step={1} name={"scale"} value={generationVariables.scale}/>
                        <Slider min={0} max={10} step={1} name={"octaves"} value={generationVariables.octaves}/>
                        <Slider min={0} max={5} step={0.01} name={"lacunarity"} value={generationVariables.lacunarity}/>
                        <Slider min={0} max={2} step={0.01} name={"persistance"} value={generationVariables.persistance}/>
                        <Slider min={0} max={5} step={0.05} name={"offsetX"} value={generationVariables.offsetX}/>
                        <Slider min={0} max={5} step={0.05} name={"offsetY"} value={generationVariables.offsetY}/>
                        <Slider min={3} max={50} step={1} name={"scaleY"} value={generationVariables.scaleY}/>
                        <p>Seed</p>
                        <input type='text' name="seed" value={generationVariables.seed}></input>
                    </form>
                </main>
            }
            {
                chosenTab==="color" &&
                <ColorsSettings colorValues={colorValues}/>
            }
            {
                chosenTab==="path" &&
                <PathSettings />
            }
            {
                chosenTab==="export" && 
                <ExportFile />
            }
            {
                chosenTab==="terraform" && 
                <Terraform />
            }
        </div>
    )
}

export default NoiseGeneratorControls