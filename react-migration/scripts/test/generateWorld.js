import createNode from "../graph/createNode";
import mapping from "../mapping";
import applyColor from "../applyColor";
import * as THREE from 'three';

const generateWorld = (data) =>{
    const {
        points,
        pointsOfTriangleIndexes,
        width,
        height,
        scene,
        geometry,
        material,
        scaleY
    } = data;

    const numVertecies = pointsOfTriangleIndexes.length*9;
    let vertexIndex = 0;
    const positions = new Float32Array(numVertecies);
    const graph = [];
    const colors = new Float32Array(numVertecies);
    for(let i=0;i<pointsOfTriangleIndexes.length;i++){

        let y1 = points[pointsOfTriangleIndexes[i].a].y;
        let y2 = points[pointsOfTriangleIndexes[i].b].y;
        let y3 = points[pointsOfTriangleIndexes[i].c].y;
        
        const avrageY = (y1+y2+y3)/3;//needet to determine cost value of each node
        
        const x1 = points[pointsOfTriangleIndexes[i].a].x;
        const x2 = points[pointsOfTriangleIndexes[i].b].x;
        const x3 = points[pointsOfTriangleIndexes[i].c].x;
        
        const z1 = points[pointsOfTriangleIndexes[i].a].z;
        const z2 = points[pointsOfTriangleIndexes[i].b].z;
        const z3 = points[pointsOfTriangleIndexes[i].c].z;
                   
        const position = [x1,y1+1,z1,x2,y2+1,z2,x3,y3+1,z3];//position of each triangle with y cordinate a bit higher so the mesh is above the other one
        createNode(graph,i,avrageY,width,position);
    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ));
    geometry.computeVertexNormals();//needed for light to work


    const mesh = new THREE.Mesh( geometry, material );
    mesh.name='worldMesh';
    scene.add(mesh);
    return graph;
}
export default generateWorld;