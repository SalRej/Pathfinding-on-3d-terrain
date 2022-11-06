import mapping from "../mapping";
import * as THREE from 'three';

const makeGreyImage = (triangleIndexes,positions,colors,points) =>{

    for(let i=0;i<triangleIndexes.length;i++){
        positions.push(
            points[triangleIndexes[i].a].x,points[triangleIndexes[i].a].y,points[triangleIndexes[i].a].z,
            points[triangleIndexes[i].b].x,points[triangleIndexes[i].b].y,points[triangleIndexes[i].b].z,
            points[triangleIndexes[i].c].x,points[triangleIndexes[i].c].y,points[triangleIndexes[i].c].z
        );
        
        const grey1 = mapping(points[triangleIndexes[i].a].y,-1,1,0,1);
        const color1 = new THREE.Color(grey1,grey1,grey1);

        const grey2 = mapping(points[triangleIndexes[i].b].y,-1,1,0,1);
        const color2 = new THREE.Color(grey2,grey2,grey2);

        const grey3 = mapping(points[triangleIndexes[i].c].y,-1,1,0,1);
        const color3 = new THREE.Color(grey3,grey3,grey3);

        colors.push(
            color1.r,color1.g,color1.b,
            color2.r,color2.g,color2.b,
            color3.r,color3.g,color3.b
        )
    }
}
export default makeGreyImage;