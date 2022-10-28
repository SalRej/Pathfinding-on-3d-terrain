import React , {useContext}from 'react'
import worldDataContext from './contex';

function Terraform() {

    const {isTerraforming,setIsTerraforming ,pathFindingVariables, setPathFindingVariables , THREEScene} = useContext(worldDataContext);
    const handleTerraformChange = () =>{
        setIsTerraforming(!isTerraforming);
        setPathFindingVariables({
            ...pathFindingVariables,
            startId:-1,
            endId:-1,
            isEnagled:false
        })

        const {scene} = THREEScene;
        scene.remove(scene.getObjectByName('pathMesh'));
    }
    return (
        <main>
            <div className='info'>
            <img src="icons8-info-24.png"></img>
                <ul>
                    <li>camera will be locked durring terrafoming</li>
                    <li>left button to rise terrain</li>
                    <li>right button to lower the terrain</li>
                    <li>Enabeling this option will diasble pathfinding</li>
                </ul>
            </div>
            <button className={isTerraforming===true?'enabled':'disabled'}
                    onClick={handleTerraformChange}
            >{isTerraforming===true?'Disable Terraforming':'Enable Terraforming'}</button>
        </main>
    )
}

export default Terraform