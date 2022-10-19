/*
    this function creates a node and push it to the graph with nodes
    every node contains id and array of neighbors
    the array of neighbors contains the ids of the neoighbor triangles
    
    the function takes graph,i as 1d index of array with triangles
    width is needed to convert 1d index to 2d index of array
    
    every first triangle is goning to have left,right,top triangles as neighbors
    every second triangle is going to have left,right,bottom triangles as neighbros 
    
    every neighbor that is not certein i calculate otherwise directly add it

*/
const createNode = (graph,i,avrageY,width,position) =>{
    
    let movingCost = 0;
    const costs = [
        {
            lowRange:0.15,
            heighRange:0.4,
            value:1
        },
        {
            lowRange:0.4,
            heighRange:0.6,
            value:3
        },
        {
            lowRange:0.6,
            heighRange:0.75,
            value:7
        },
        {
            lowRange:0.75,
            heighRange:0.9,
            value:13
        },
        {
            lowRange:0.9,
            heighRange:Infinity,
            value:20
        }
    ]
    
    costs.forEach(cost=>{
        if(avrageY>cost.lowRange && avrageY<=cost.heighRange){
            movingCost=cost.value;
        }
    })

    const waterLevel = 0.15;
    graph.push({
        id:i,
        isVisited:false,
        isObstical:avrageY<=waterLevel?true:false,
        shortestDistance:Infinity,
        cost:movingCost,
        prevNodeId:undefined,
        neighborId:[],
        position:position
    })
    
    //first element push directly with given neighbors
    if(i==0){
        graph[i].neighborId.push(i+1,i+(width*2)-1);//i+1 neighbor on right, i+1(width*2)-1 is neighbor on bottom
    }
    else if(i%2!=0){

        graph[i].neighborId.push(i-1);

        //index of triangle next to current one
        const neghborRight = i+1;
        //divide by 2 becouse there 2 triangles on every index
        const rightIndex = Math.floor(neghborRight/2);
        //convert index to 2d index x
        const rightX =  Math.floor(rightIndex%(width-1));

        //calculate the up neighbor 
        const neightUp = i-(width*2)+1;
        //if up neighbor is outside the mesh then dont add him
        if(neightUp>=0){
            graph[i].neighborId.push(neightUp);
        }
        //if right neighbor is == 0 this means the triangle is on the opposite side of the mesh
        //and this is not a valid neighbor else add it
        if(rightX!=0){
            graph[i].neighborId.push(neghborRight);
        }

    }else if(i%2==0){
        //same procedure as above but for left neighbor
        const neighborLeft = i-1;
        const leftIndex = Math.floor(neighborLeft/2);
        const leftX = Math.floor(leftIndex%(width-1));
        
        graph[i].neighborId.push(i+1);

        const neighborDown =i+(width*2)-1;
        const numTrianglesOnLine = (width-1)*2;
        const numTrianglesTotal = numTrianglesOnLine*(width-1);

        if(neighborDown<=numTrianglesTotal){
            graph[i].neighborId.push(neighborDown);
        }

        if(leftX!=width-2){
            graph[i].neighborId.push(neighborLeft);
        }

    }
}

export default createNode