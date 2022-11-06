
const djikstra = (graph,startId,endId) =>{
    
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
                }

                //add this neighbor in array to be chaked later
                nodesIdToCheck.push({id:neighbor,value:graph[neighbor].shortestDistance});

                //draws a line from current triangle center to the neighbor triangle center
                const currentTriangleCenter = 
            }
        })

        //this code below is questionable
        //it should improve djikstra by ending it sooner
        if(currentId==endId){
            let isFninished = true;
            graph[currentId].neighborId.forEach(neighbor=>{
                if(graph[neighbor].isVisited==false){
                    isFninished=false;
                }
            })
            if(isFninished==true){
                break;
            }
        }

        graph[currentId].isVisited=true;
        nodesIdToCheck=nodesIdToCheck.filter(data=>{
            return data.id!=currentId;
        })
    }

    //backtrack
    const path=[];
    path.push(graph[endId].prevNodeId);
    while(path[path.length-1]!=startId){
        path.push(graph[path[path.length-1]].prevNodeId);
    }
    
    return path;
}

export default djikstra;