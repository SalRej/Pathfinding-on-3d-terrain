import mapping from "../mapping";
import makeGreyImage from "./makeGreyImage";
import makeColorImage from "./makeColorImage";
import createNode from "../createNode";

import * as THREE from 'three';
const animateWorldGeneration = (data) =>{

    const {
        pointsOfTriangleIndexes,
        points,
        width,
        height,
        scene,
        geometry,
        material,
        scaleY
    } = data;

    const numVertecies = pointsOfTriangleIndexes.length*9;
    const positions = new Float32Array(numVertecies);
    const colors = new Float32Array(numVertecies);
    const graph = [];

    makeGreyImage(pointsOfTriangleIndexes,positions,colors,points,geometry);
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
            makeColorImage(pointsOfTriangleIndexes,points,mesh,scaleY);
        }
    },1)

    //creates graph
    for(let i=0;i<pointsOfTriangleIndexes.length;i++){
            
        const x1 = points[pointsOfTriangleIndexes[i].a].x;
        const x2 = points[pointsOfTriangleIndexes[i].b].x;
        const x3 = points[pointsOfTriangleIndexes[i].c].x;

        const y1 = mapping(points[pointsOfTriangleIndexes[i].a].y,0,1,0,scaleY);
        const y2 = mapping(points[pointsOfTriangleIndexes[i].b].y,0,1,0,scaleY);
        const y3 = mapping(points[pointsOfTriangleIndexes[i].c].y,0,1,0,scaleY);

        const z1 = points[pointsOfTriangleIndexes[i].a].z;
        const z2 = points[pointsOfTriangleIndexes[i].b].z;
        const z3 = points[pointsOfTriangleIndexes[i].c].z;

        const position = [x1,y1+1,z1,x2,y2+1,z2,x3,y3+1,z3];//position of each triangle with y a bit higher so the mesh is above the othe one
        const avrageY = (y1+y2+y3)/3;//needet to determine cost value of each node
        createNode(graph,i,avrageY,width,position);
    }
}
export default animateWorldGeneration;