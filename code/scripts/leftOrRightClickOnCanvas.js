import getTriangleClicked from './getTriangleClicked';

function leftOrRightClickOnCanvas(event,THREEScene,terraformingVariables,pathFindingVariables){
    event.preventDefault();
    event.stopPropagation();


    if(terraformingVariables.isEnabled === true){
        return null;
    }

    const {camera,renderer,scene} = THREEScene;
    const clickedFace = getTriangleClicked(event.clientX,event.clientY,renderer,camera,scene);

    if(clickedFace===null)
        return null;
        
    if(pathFindingVariables.isEnabled===false)
        return null;

    if(pathFindingVariables.graph[clickedFace].isObstical===true){
        alert("cant travel on water");
        return null;
    }

    //click means left button is clicked
    if(event.type === "click"){
        return {click:'left',face:clickedFace};
    }else if (event.type === "contextmenu"){//contexmenu means right button is clicked
        event.preventDefault();
        event.stopPropagation();
        return {click:'right',face:clickedFace};
    }
}

export default leftOrRightClickOnCanvas;