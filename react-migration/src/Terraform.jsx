import React , {useContext}from 'react'
import worldDataContext from './contex';

function Terraform() {

    const {isTerraforming,setIsTerraforming} = useContext(worldDataContext);

    return (
        <main>
            <div className='info'>
            <img src="icons8-info-24.png"></img>
                <ul>
                    <li>camera will be locked durring terrafoming</li>
                    <li>left button to rise terrain</li>
                    <li>right button to lower the terrain</li>
                </ul>
            </div>
            <button className={isTerraforming===true?'enabled':'disabled'}
                    onClick={()=>{setIsTerraforming(!isTerraforming)}}
            >{isTerraforming===true?'Disable Terraforming':'Enable Terraforming'}</button>
        </main>
    )
}

export default Terraform