import {useEffect,useContext} from 'react'
import worldDataContext from '../contex';

function useOnLoad(generationFunction,generationVariables,canvasHolder,mouseX,mouseY){

    const {THREEScene,pathFindingVariables,setPathFindingVariables} = useContext(worldDataContext);
    useEffect(()=>{
        if(canvasHolder.current!=null){
            canvasHolder.current.appendChild(THREEScene.renderer.domElement);
        }
        
        THREEScene.scene.remove(THREEScene.scene.getObjectByName('worldMesh'));
        THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh')); 
        const graph = generationFunction(generationVariables,THREEScene.scene);

        setPathFindingVariables({
            ...pathFindingVariables,
            graph:graph
        })

        window.addEventListener('mousemove',(event)=>{
            mouseX.current = event.clientX;
            mouseY.current = event.clientY;
        })
        animate();

    },[])
        
    function animate() {
        requestAnimationFrame( animate );
        THREEScene.controls.update();
        THREEScene.renderer.render( THREEScene.scene, THREEScene.camera);
    };
}

export default useOnLoad