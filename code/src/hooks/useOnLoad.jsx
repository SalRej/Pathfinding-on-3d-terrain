import {useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setGraph } from '../actions/pathFindingActions';

function useOnLoad(generationFunction,generationVariables,canvasHolder,mouseX,mouseY){

    const dispatch = useDispatch();
    const THREEScene = useSelector(state => state.THREEScene);
    const colorValues = useSelector(state => state.colorValues);

    useEffect(()=>{
        if(canvasHolder.current!=null){
            canvasHolder.current.appendChild(THREEScene.renderer.domElement);
        }
        
        THREEScene.scene.remove(THREEScene.scene.getObjectByName('worldMesh'));
        THREEScene.scene.remove(THREEScene.scene.getObjectByName('pathMesh')); 
        const graph = generationFunction(generationVariables,colorValues,THREEScene.scene);

        dispatch(setGraph(graph));
        
        window.addEventListener('mousemove',(event)=>{
            mouseX.current = event.clientX;
            mouseY.current = event.clientY;
        })
        window.addEventListener('touchmove',(event)=>{
            mouseX.current = event.touches[0].clientX;
            mouseY.current = event.touches[0].clientY;
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