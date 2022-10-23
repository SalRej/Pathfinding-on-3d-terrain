import mapping from "../mapping";
import * as THREE from 'three';

const makeGreyImage = (pointsOfTriangleIndexes,positions,colors,points) =>{

    let vertexIndex = 0;

    for(let i=0;i<pointsOfTriangleIndexes.length;i++){
        
        //add the points
        positions[vertexIndex+0]=points[pointsOfTriangleIndexes[i].a].x;
        positions[vertexIndex+1]=points[pointsOfTriangleIndexes[i].a].y;
        positions[vertexIndex+2]=points[pointsOfTriangleIndexes[i].a].z;

        positions[vertexIndex+3]=points[pointsOfTriangleIndexes[i].b].x;
        positions[vertexIndex+4]=points[pointsOfTriangleIndexes[i].b].y;
        positions[vertexIndex+5]=points[pointsOfTriangleIndexes[i].b].z;

        positions[vertexIndex+6]=points[pointsOfTriangleIndexes[i].c].x;
        positions[vertexIndex+7]=points[pointsOfTriangleIndexes[i].c].y;
        positions[vertexIndex+8]=points[pointsOfTriangleIndexes[i].c].z;

        //create colors according to y cordinate into grey scale
        const grey1 = mapping(points[pointsOfTriangleIndexes[i].a].y,-1,1,0,1);
        const color1 = new THREE.Color(grey1,grey1,grey1);

        const grey2 = mapping(points[pointsOfTriangleIndexes[i].b].y,-1,1,0,1);
        const color2 = new THREE.Color(grey2,grey2,grey2);

        const grey3 = mapping(points[pointsOfTriangleIndexes[i].c].y,-1,1,0,1);
        const color3 = new THREE.Color(grey3,grey3,grey3);

        //push colors
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
    }
}
export default makeGreyImage;