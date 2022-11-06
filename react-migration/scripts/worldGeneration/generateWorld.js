import createNode from "../createNode";
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
        
        const x1 = points[pointsOfTriangleIndexes[i].a].x;
        const x2 = points[pointsOfTriangleIndexes[i].b].x;
        const x3 = points[pointsOfTriangleIndexes[i].c].x;
        
        const z1 = points[pointsOfTriangleIndexes[i].a].z;
        const z2 = points[pointsOfTriangleIndexes[i].b].z;
        const z3 = points[pointsOfTriangleIndexes[i].c].z;
        
        //3 colors for each vertex of the triangle
        let color1={r:0,g:1,b:0};
        let color2={r:0,g:1,b:0};
        let color3={r:0,g:1,b:0};
        
        //apply diffrent colors depending on vertex.y value
        applyColor(y1,y2,y3,color1,color2,color3);


        //chesck if the pints is too low this means its water so make it one level of height
        y1 = mapping(points[pointsOfTriangleIndexes[i].a].y,-1,1,0,scaleY);
        y2 = mapping(points[pointsOfTriangleIndexes[i].b].y,-1,1,0,scaleY);
        y3 = mapping(points[pointsOfTriangleIndexes[i].c].y,-1,1,0,scaleY);

        const checkY1 = mapping(y1,0,scaleY,0,1);
        const checkY2 = mapping(y2,0,scaleY,0,1);
        const checkY3 = mapping(y3,0,scaleY,0,1);

        if(checkY1 <= 0.15){
            y1=mapping(0.15,0,1,0,scaleY);
        }
        if(checkY2 <= 0.15){
            y2=mapping(0.15,0,1,0,scaleY);
        } 
        if(checkY3 <= 0.15){
            y3=mapping(0.15,0,1,0,scaleY);
        } 
        
        
        positions[vertexIndex+0]=x1;
        positions[vertexIndex+1]=y1;
        positions[vertexIndex+2]=z1;
        positions[vertexIndex+3]=x2;
        positions[vertexIndex+4]=y2;
        positions[vertexIndex+5]=z2;
        positions[vertexIndex+6]=x3;
        positions[vertexIndex+7]=y3;
        positions[vertexIndex+8]=z3;

        colors[vertexIndex+0]=color1.r;
        colors[vertexIndex+1]=color1.g;
        colors[vertexIndex+2]=color1.b;
        colors[vertexIndex+3]=color2.r;
        colors[vertexIndex+4]=color2.g;
        colors[vertexIndex+5]=color2.b;
        colors[vertexIndex+6]=color3.r;
        colors[vertexIndex+7]=color3.g;
        colors[vertexIndex+8]=color3.b;
        
        vertexIndex+=9;

        const position = [x1,y1+1,z1,x2,y2+1,z2,x3,y3+1,z3];//position of each triangle with y a bit higher so the mesh is above the othe one
        //needed later for animation of pathfinding
        const avrageY = (y1+y2+y3)/3;//needet to determine cost value of each node
        createNode(graph,i,avrageY,width,position);
    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ));
    geometry.computeVertexNormals();//needed for light to work
    geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ));

    const mesh = new THREE.Mesh( geometry, material );
    mesh.name='worldMesh';
    scene.add(mesh);
}
export default generateWorld;