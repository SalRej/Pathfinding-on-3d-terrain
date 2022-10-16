import React from 'react'
import Slider from './Slider';
function NoiseGeneratorControls({generationVariables , handleNoiseSettings , changeResolution}){

    const handleChange = (e) =>{
        handleNoiseSettings(e);
    }
    const handleResolutionChange = (e) =>{
        changeResolution(Number(e.target.value));
    }
    return (
        <div className='controls'>

            <p className='heading'>World generation settings</p>
            <form onChange={handleResolutionChange}>
                <Slider min={20} max={500} name='resolution' value={generationVariables.width}/>
            </form>

            <form onChange={handleChange}>
                <Slider min={0} max={200} step={1} name={"scale"} value={generationVariables.scale}/>
                <Slider min={0} max={10} step={1} name={"octaves"} value={generationVariables.octaves}/>
                <Slider min={0} max={5} step={0.01} name={"lacunarity"} value={generationVariables.lacunarity}/>
                <Slider min={0} max={2} step={0.01} name={"persistance"} value={generationVariables.persistance}/>
                <Slider min={0} max={5} step={0.05} name={"offsetX"} value={generationVariables.offsetX}/>
                <Slider min={0} max={5} step={0.05} name={"offsetY"} value={generationVariables.offsetY}/>
                <Slider min={0} max={50} step={1} name={"scaleY"} value={generationVariables.scaleY}/>
                <p>Seed</p>
                <input type='text' name="seed" value={generationVariables.seed}></input>
            </form>
        </div>
    )
}

export default NoiseGeneratorControls