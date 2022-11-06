import mapping from "../mapping";
import applyColor from "../applyColor";
const adjustTerrain = (pointIndex,positions,colors,startCenterX,startCenterZ,range,strength,scaleY,doRaise) =>{

    //find distance of each point to middle of triangle clicked
    const x = positions.getX(pointIndex);
    const z = positions.getZ(pointIndex);

    const dist = Math.sqrt(Math.pow(startCenterX-x,2)+Math.pow(startCenterZ-z,2));

    //apply new hight
    const addedValueforY = mapping(-dist,-range,0,0,strength);

    let newY;
    if(doRaise===true){
        newY = positions.getY(pointIndex) + addedValueforY;
    }else if(doRaise===false){
        newY = positions.getY(pointIndex) - addedValueforY;
    }

    if(newY<=scaleY+5 && newY>=0){
        positions.setY(pointIndex,newY);
    }
    //apply color acording to the new hight
    const color = {r:0,g:0,b:0};

    const valueForColoring = mapping(positions.getY(pointIndex),0,scaleY,0,1);

    //levels the watter
    if(valueForColoring <= 0.15){
        const waterLevel = mapping(0.15,0,1,0,scaleY);
        positions.setY(pointIndex,waterLevel);
    }

    applyColor(valueForColoring,color);
    colors.setXYZ(pointIndex,color.r,color.g,color.b);
}
export default adjustTerrain;