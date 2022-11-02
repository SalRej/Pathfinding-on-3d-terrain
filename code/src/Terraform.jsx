import React , {useContext}from 'react'
import worldDataContext from './contex';
import Slider from './Slider';

function Terraform() {

    const {terraformingVariables,setTerraformingVariables ,pathFindingVariables, setPathFindingVariables , THREEScene} = useContext(worldDataContext);
    const handleTerraformChange = () =>{
        setTerraformingVariables({
            ...terraformingVariables,
            isEnabled:!terraformingVariables.isEnabled
        })
        setPathFindingVariables({
            ...pathFindingVariables,
            startId:-1,
            endId:-1,
            isEnagled:false
        })

        const {scene} = THREEScene;
        scene.remove(scene.getObjectByName('pathMesh'));
    }

    const handleTerraformingVariablesChange = (event) =>{
        setTerraformingVariables({
            ...terraformingVariables,
            [event.target.name]:event.target.value
        })
    }
    return (
        <main>
            <form onChange={handleTerraformingVariablesChange}>
                <Slider min={1} max={25} step={1} name='brushRadius' value={terraformingVariables.brushRadius}/>
                <Slider min={0.1} max={1} step={0.1} name='brushStrength' value={terraformingVariables.brushStrength}/>
            </form>
            <div className='info'>
            <img src="icons8-info-24.png"></img>
                <ul>
                    <li>Camera will be locked durring terrafoming</li>
                    <li>Left button to rise terrain</li>
                    <li>Right button to lower terrain</li>
                    <li>If you are using the app on mobile only rising the terrain will work</li>
                </ul>
            </div>
            <button className={terraformingVariables.isEnabled===true?'enabled':'disabled'}
                    onClick={handleTerraformChange}
            >{terraformingVariables.isEnabled===true?'Disable Terraforming':'Enable Terraforming'}</button>
        </main>
    )
}

export default Terraform