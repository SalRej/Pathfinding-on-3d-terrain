import { calculateMovingCost } from "../graph/createNode";
import mapping from "../mapping";

const adjustGraphNodes = (nodesIdsToAdjust,graph,ind,positions,scaleY) =>{
    for(let i = 0;i<nodesIdsToAdjust.length;i++){

        const id = nodesIdsToAdjust[i];

        const point1 = ind.getX(id*3);
        const point2 = ind.getY(id*3);
        const point3 = ind.getZ(id*3);
  
        const y1 = positions.getY(point1);
        const y2 = positions.getY(point2);
        const y3 = positions.getY(point3);
        
        const normalizedY1 = mapping(y1,0,scaleY,0,1);
        const normalizedY2 = mapping(y2,0,scaleY,0,1);
        const normalizedY3 = mapping(y3,0,scaleY,0,1);

        const avrageY = (normalizedY1+normalizedY2+normalizedY3)/3;//needed to determine cost value of each node
        const movingCost = calculateMovingCost(avrageY);

        graph[id].cost = movingCost;
        graph[id].position[1]=y1+1;
        graph[id].position[4]=y2+1;
        graph[id].position[7]=y3+1;
        graph[id].isObstical = avrageY<=0.15?true:false;
        graph[id].isVisited = false;
    }

}
export default adjustGraphNodes;