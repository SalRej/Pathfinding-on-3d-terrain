import React from 'react'

function NoiseGeneratorControls({generationVariables , handleNoiseSettings , changeResolution}){

    const handleChange = (e) =>{
        handleNoiseSettings(e);
    }
    const test = (e) =>{
        changeResolution(Number(e.target.value));
    }
    return (
        <div>
                <p>resolutionX:{generationVariables.width}</p>
                <input type='range' min={0} max={1000} name="resolution" onChange={test}></input>
            <form onChange={handleChange}>


                <p>Scale:{generationVariables.scale}</p>
                <input type='range' min={0} max={200} name="scale" value={generationVariables.scale}></input>

                <p>Octaves:{generationVariables.octaves}</p>
                <input type='range' min={0} max={10} name="octaves" value={generationVariables.octaves}></input>

                <p>Lacunarity:{generationVariables.lacunarity}</p>
                <input type='range' min={0} max={5} name="lacunarity" value={generationVariables.lacunarity}></input>

                <p>Persistance:{generationVariables.persistance}</p>
                <input type='range' min={0} max={2} name="persistance" value={generationVariables.persistance}></input>

                <p>offsetX:{generationVariables.offsetX}</p>
                <input type='range' min={0} max={5} name="offsetX" step={0.1} value={generationVariables.offsetX}></input>

                <p>offsetY:{generationVariables.offsetY}</p>
                <input type='range' min={0} max={5} name="offsetY" step={0.1} value={generationVariables.offsetY}></input>

                <p>ScaleY : {generationVariables.scaleY}</p>
                <input type='range' min={0} max={50} name="scaleY" step={1} value={generationVariables.scaleY}></input>

                <p>Seed</p>
                <input type='text' name="seed" value={generationVariables.seed}></input>

            </form>
        </div>
    )
}

export default NoiseGeneratorControls