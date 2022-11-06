import djikstra from "./djikstra";
import * as THREE from 'three'

const findPath = (pathFindingVariables,scene) =>{
    const {startId , endId , graph } = pathFindingVariables;

    if(startId!=-1 && endId!=- 1){
        scene.remove(scene.getObjectByName("pathMesh"));
        const pathCordinates = djikstra(graph,startId,endId);

        const pathGeometry = new THREE.BufferGeometry();
        pathGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathCordinates.path, 3 ));
        pathGeometry.computeVertexNormals();//needed for light to work
        
        const pathMaterial = new THREE.MeshStandardMaterial( {
            side: THREE.DoubleSide,color:0xff0000
        });

        const pathMesh = new THREE.Mesh( pathGeometry, pathMaterial );
        pathMesh.name = "pathMesh";
        scene.add(pathMesh);
    }
}

export default findPath;