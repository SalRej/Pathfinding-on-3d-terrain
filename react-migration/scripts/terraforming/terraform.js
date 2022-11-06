import getTriangleClicked from "../getTriangleClicked";
import adjustTerrain from "./adjustTerrain";
import adjustGraphNodes from "./adjustGraphNodes";

const isInRange = (currentTriangle,startCenterX,startCenterZ,range)=>{

    const currentX1 = currentTriangle.position[0];
    const currentZ1 = currentTriangle.position[2];

    const currentX2 = currentTriangle.position[3];
    const currentZ2 = currentTriangle.position[5];

    const currentX3 = currentTriangle.position[6];
    const currentZ3 = currentTriangle.position[8];

    const dist1 = Math.sqrt(Math.pow(startCenterX-currentX1,2)+Math.pow(startCenterZ-currentZ1,2));
    const dist2 = Math.sqrt(Math.pow(startCenterX-currentX2,2)+Math.pow(startCenterZ-currentZ2,2));
    const dist3 = Math.sqrt(Math.pow(startCenterX-currentX3,2)+Math.pow(startCenterZ-currentZ3,2));

    
    if(dist1<=range && dist2<=range && dist3<=range){
        return true;
    }

    return false;
}

const terraform = (triangleId,THREEScene,pathFindingVariables,scaleY,doRaise) =>{

    const {camera,renderer,scene} = THREEScene;
    // const triangleId = getTriangleClicked(event,renderer,camera,scene);
    const {graph} = pathFindingVariables;
    const range = 10;
    
    //positions array structure = [x1,y1,z1  ,x2,y2,z2  ,x3,y3,z3]
    const worldMesh = scene.getObjectByName('worldMesh');

    const ind = worldMesh.geometry.getIndex();
    const positions = worldMesh.geometry.getAttribute('position');
    const colors = worldMesh.geometry.getAttribute('color');

    const point1 = ind.getX(triangleId*3);
    const point2 = ind.getY(triangleId*3);
    const point3 = ind.getZ(triangleId*3);

    
    const startPointX1 = positions.getX(point1);
    const startPointZ1 = positions.getZ(point1);

    const startPointX2 = positions.getX(point2);
    const startPointZ2 = positions.getZ(point2);

    const startPointX3 = positions.getX(point3);
    const startPointZ3 = positions.getZ(point3);

    const startCenterX = (startPointX1+startPointX2+startPointX3)/3;
    const startCenterZ = (startPointZ1+startPointZ2+startPointZ3)/3;    
    
    let nodesIdToCheck = [];//array that holds nodes that are left to be checked
    nodesIdToCheck.push(triangleId);

    const idsOfPointsToTerraform = new Set();
    const nodesIdsToAdjust = [];
    //check all neighboring nodes of the clicked one 
    //terraform them until the node is no longer in range
    while(nodesIdToCheck.length>0){

        const currentId = nodesIdToCheck.pop();

        const point1 = ind.getX(currentId*3);
        const point2 = ind.getY(currentId*3);
        const point3 = ind.getZ(currentId*3);

        idsOfPointsToTerraform.add(point1,point2,point3);

        nodesIdsToAdjust.push(currentId);

        graph[currentId].neighborId.forEach((neighbor)=>{
            
            if(graph[neighbor].isVisited==false){

                if(isInRange(graph[neighbor],startCenterX,startCenterZ,range)===true){
                    nodesIdToCheck.push(graph[neighbor].id);
                }

            }
        })

        graph[currentId].isVisited=true;
        //removes current node from list to check
        nodesIdToCheck=nodesIdToCheck.filter(data=>{
            return data.id!=currentId;
        })
    }

    idsOfPointsToTerraform.forEach(pointId=>{
        adjustTerrain(pointId,positions,colors,startCenterX,startCenterZ,range,scaleY,doRaise);
    })


    adjustGraphNodes(nodesIdsToAdjust,graph,ind,positions,scaleY);
    
    worldMesh.geometry.attributes.color.needsUpdate=true;
    worldMesh.geometry.attributes.position.needsUpdate=true;
    worldMesh.geometry.computeVertexNormals();
}

export default terraform;