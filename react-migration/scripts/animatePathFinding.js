
const animatePathFinding = (vizualizingMesh,pathMesh,drawRanges,scene) =>{

    //vizualize the nodes visited by the djikstra algorithm in order
    if(drawRanges.vizualizeMeshDrawRange <= vizualizingMesh.geometry.attributes.position.array.length/3){
    
        vizualizingMesh.geometry.setDrawRange( 0, drawRanges.vizualizeMeshDrawRange );
        vizualizingMesh.geometry.attributes.position.needsUpdate = true;
        drawRanges.vizualizeMeshDrawRange+=300;

    }else{
        // vizualize the path
        scene.remove(scene.getObjectByName("vizualizingMesh"));

        if(drawRanges.pathDrawRange<=pathMesh.geometry.attributes.position.array.length/3){
            pathMesh.geometry.setDrawRange(0,drawRanges.pathDrawRange);
            pathMesh.geometry.attributes.position.needsUpdate=true;
            drawRanges.pathDrawRange+=5;
        }
    }
}
export default animatePathFinding;
