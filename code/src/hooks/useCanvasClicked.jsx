import React from 'react'
import getTriangleClicked from '../../scripts/getTriangleClicked';

function useCanvasClicked(event,THREEScene,terraformingVariables,pathFindingVariables,setPathFindingVariables){
    event.preventDefault();
    event.stopPropagation();
    if(terraformingVariables.isEnabled === true){
        return;
    }

    const {camera,renderer,scene} = THREEScene;
    const clickedFace = getTriangleClicked(event.clientX,event.clientY,renderer,camera,scene);

    if(clickedFace===null)
        return;
        
    if(pathFindingVariables.isEnagled===false)
        return;

    if(pathFindingVariables.graph[clickedFace].isObstical===true){
        alert("cant travel on water");
        return;
    }

    //click means left button is clicked
    if(event.type === "click"){
        setPathFindingVariables({
            ...pathFindingVariables,
            startId:clickedFace
        })
    }else if (event.type === "contextmenu"){//contexmenu means right button is clicked
        event.preventDefault();
        event.stopPropagation();
        setPathFindingVariables({
            ...pathFindingVariables,
            endId:clickedFace
        })
    }
}

export default useCanvasClicked