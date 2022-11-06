import * as THREE from 'three';

const djikstra = (graph,startId,endId) =>{
    
    const vizualizingGeometry = [];
    //clear graph from before
    graph.forEach(node=>{
        node.isVisited=false;
        node.prevNodeId =undefined;
        node.shortestDistance=Infinity;
    })

    //set the distance from start node to be 0
    graph[startId].cost=0;
    graph[startId].shortestDistance=0;

    let nodesIdToCheck = [];//array that holds nodes that are left to be checked
    nodesIdToCheck.push({id:startId,value:0});

    while(nodesIdToCheck.length>0){
        
        //take the node with smallest cost value
        let min =Infinity;
        let index = -1;

        for(let i =0;i<nodesIdToCheck.length;i++){
            if(min>nodesIdToCheck[i].value){
                min=nodesIdToCheck[i].value;
                index = nodesIdToCheck[i].id;
            }
        }

        const currentId = index;
        //check all neihbors of current node
        graph[currentId].neighborId.forEach((neighbor)=>{
            //if the neigbor is visited or obsticle dont do anything
            if(graph[neighbor].isVisited==false && graph[neighbor].isObstical==false){
                
                //calculate the new short distance , if it is smaller then the previous one then update the distance and 
                //update the prevNode
                const newShortesDistance = graph[currentId].shortestDistance+graph[neighbor].cost;
                
                if(newShortesDistance<graph[neighbor].shortestDistance){
                    graph[neighbor].shortestDistance=newShortesDistance;
                    graph[neighbor].prevNodeId = currentId;

                    //draws a line from current triangle center to the neighbor triangle center
                        // const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
                        // const points = [];
                        // const currentTriangleCenter = graph[currentId].triangleCenter;
                        // const neighborTriangleCenter = graph[neighbor].triangleCenter;
                        // points.push( new THREE.Vector3(currentTriangleCenter.x, currentTriangleCenter.y, currentTriangleCenter.z ) );
                        // points.push( new THREE.Vector3( neighborTriangleCenter.x,neighborTriangleCenter.y,neighborTriangleCenter.z ) );
                        
                        // const geometry = new THREE.BufferGeometry().setFromPoints( points );
                        // const line = new THREE.Line( geometry, material );
                        // vizualizingGeometry.push(line);
                        graph[neighbor].position.forEach(cordinate=>{
                            vizualizingGeometry.push(cordinate);
                        })
                }

                //add this neighbor in array to be chaked later
                nodesIdToCheck.push({id:neighbor,value:graph[neighbor].shortestDistance});

            }
        })

        graph[currentId].isVisited=true;
        nodesIdToCheck=nodesIdToCheck.filter(data=>{
            return data.id!=currentId;
        })
    }

    //backtrack
    const path=[];
    const backtrack = [];
    backtrack.push(graph[endId].prevNodeId);
    while(backtrack[backtrack.length-1]!=startId){

        graph[backtrack[backtrack.length-1]].position.forEach(cordinates=>{
            path.push(cordinates);
        })
        
        backtrack.push(graph[backtrack[backtrack.length-1]].prevNodeId);
    }
    
    return {path,vizualizingGeometry};
}

export default djikstra;