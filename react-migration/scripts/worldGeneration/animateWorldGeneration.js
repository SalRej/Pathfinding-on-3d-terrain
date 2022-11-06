import mapping from "../mapping";
import makeGreyImage from "./makeGreyImage";
import makeColorImage from "./makeColorImage";
import createNode from "../createNode";

import * as THREE from 'three';
const animateWorldGeneration = (data) =>{
    console.log(mapping(3,0,20,0,1));

    const {
        triangleIndexes,
        points,
        width,
        height,
        scene,
        geometry,
        material,
        graph,
        positions,
        colors,
        scaleY
    } = data;

    makeGreyImage(triangleIndexes,positions,colors,points,geometry);
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ));
    geometry.computeVertexNormals();//needed for light to work
    geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ));

    
    const mesh = new THREE.Mesh( geometry, material );
    mesh.name='worldMesh';
    scene.add(mesh);
    let step =0;

    const firstAnimationInterval = setInterval(()=>{
        step+=200;
        scene.children[3].geometry.setDrawRange(0,step);
        if(step>(width*height)*9){
            clearInterval(firstAnimationInterval);
            makeColorImage(triangleIndexes,points,mesh,scaleY);
        }
    },1)

    //creates graph
    for(let i=0;i<triangleIndexes.length;i++){
            
        const x1 = points[triangleIndexes[i].a].x;
        const x2 = points[triangleIndexes[i].b].x;
        const x3 = points[triangleIndexes[i].c].x;

        const y1 = mapping(points[triangleIndexes[i].a].y,-1,1,0,scaleY);
        const y2 = mapping(points[triangleIndexes[i].b].y,-1,1,0,scaleY);
        const y3 = mapping(points[triangleIndexes[i].c].y,-1,1,0,scaleY);

        const z1 = points[triangleIndexes[i].a].z;
        const z2 = points[triangleIndexes[i].b].z;
        const z3 = points[triangleIndexes[i].c].z;

        const position = [x1,y1+1,z1,x2,y2+1,z2,x3,y3+1,z3];//position of each triangle with y a bit higher so the mesh is above the othe one
        const avrageY = (y1+y2+y3)/3;//needet to determine cost value of each node
        createNode(graph,i,avrageY,width,position);
    }
}
export default animateWorldGeneration;