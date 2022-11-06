import mapping from "../mapping";
import * as THREE from 'three';

const makeGreyImage = (pointsOfTriangleIndexes,positions,colors,points) =>{

    for(let i=0;i<pointsOfTriangleIndexes.length;i++){

        //add the points
        positions.push(
            points[pointsOfTriangleIndexes[i].a].x,points[pointsOfTriangleIndexes[i].a].y,points[pointsOfTriangleIndexes[i].a].z,
            points[pointsOfTriangleIndexes[i].b].x,points[pointsOfTriangleIndexes[i].b].y,points[pointsOfTriangleIndexes[i].b].z,
            points[pointsOfTriangleIndexes[i].c].x,points[pointsOfTriangleIndexes[i].c].y,points[pointsOfTriangleIndexes[i].c].z
        );
        
        //create colors according to y cordinate into grey scale
        const grey1 = mapping(points[pointsOfTriangleIndexes[i].a].y,-1,1,0,1);
        const color1 = new THREE.Color(grey1,grey1,grey1);

        const grey2 = mapping(points[pointsOfTriangleIndexes[i].b].y,-1,1,0,1);
        const color2 = new THREE.Color(grey2,grey2,grey2);

        const grey3 = mapping(points[pointsOfTriangleIndexes[i].c].y,-1,1,0,1);
        const color3 = new THREE.Color(grey3,grey3,grey3);

        //push colors
        colors.push(
            color1.r,color1.g,color1.b,
            color2.r,color2.g,color2.b,
            color3.r,color3.g,color3.b
        )
    }
}
export default makeGreyImage;