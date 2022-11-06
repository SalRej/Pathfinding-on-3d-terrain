import * as THREE from 'three'
import { DoubleSide } from 'three';
import applyColor from './applyColor';
import mapping from './mapping';
import createPoints from './createPoints';


const createMesh = (points , pointsOfTriangleIndexes , scaleY) =>{

    const trianglePositions = [];
    const bufferGeometryColors = [];

    for(let i = 0;i < pointsOfTriangleIndexes.length ; i++){

        const x1 = points[pointsOfTriangleIndexes[i].a].x;
        const x2 = points[pointsOfTriangleIndexes[i].b].x;
        const x3 = points[pointsOfTriangleIndexes[i].c].x;

        let y1 = points[pointsOfTriangleIndexes[i].a].y;
        let y2 = points[pointsOfTriangleIndexes[i].b].y;
        let y3 = points[pointsOfTriangleIndexes[i].c].y;

        const z1 = points[pointsOfTriangleIndexes[i].a].z;
        const z2 = points[pointsOfTriangleIndexes[i].b].z;
        const z3 = points[pointsOfTriangleIndexes[i].c].z;

        
        trianglePositions.push(
            x1,mapping(y1,0,1,0,scaleY),z1,
            x2,mapping(y2,0,1,0,scaleY),z2,
            x3,mapping(y3,0,1,0,scaleY),z3
        )

        const color1={r:0,g:0,b:0};
        const color2={r:0,g:0,b:0};
        const color3={r:0,g:0,b:0};
            
        // console.log(y1,y2,y3);
        applyColor(y1,y2,y3,color1,color2,color3);
        bufferGeometryColors.push(
            color1.r,color1.g,color1.b,
            color2.r,color2.g,color2.b,
            color3.r,color3.g,color3.b
        )
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( trianglePositions, 3 ));
    bufferGeometry.computeVertexNormals();
    bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute( bufferGeometryColors, 3 ));

    return bufferGeometry;
}

const createHeightMap = (heightMapVariables,scene) =>{

    const imgOfHeightMap = heightMapVariables.image;

    const { numPointsX  ,numPointsY , scaleY} = heightMapVariables;

    //load img on canvas so can read pixes from it later
    const canvas = document.createElement('canvas');
    canvas.width=numPointsX;
    canvas.height=numPointsY;

    // document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgOfHeightMap,0,0,numPointsX,numPointsY);

    //get pixels from canvas
    const pixelsOfHeightMapImg = ctx.getImageData(0,0,numPointsX,numPointsY);
    const { points , pointsOfTriangleIndexes } = createPoints(numPointsX,numPointsY);
    
    let j = 0;
    for(let i = 0; i < pixelsOfHeightMapImg.data.length ; i+=4){
        const color = {r:0,g:0,b:0};
        color.r = pixelsOfHeightMapImg.data[i];
        color.g = pixelsOfHeightMapImg.data[i+1];
        color.b = pixelsOfHeightMapImg.data[i+2];
        
        const grey = (color.r + color.b + color.g)/3;
    
        points[j].y = mapping(grey,0,255,0,1);
        j++;
    }
    
    const bufferGeometry = createMesh(points,pointsOfTriangleIndexes,scaleY);
    const material = new THREE.MeshStandardMaterial({
        side:DoubleSide,
        vertexColors:true
    });
        
    const mesh = new THREE.Mesh(bufferGeometry,material);
    mesh.name="worldMesh";
    scene.add(mesh);    
}

export default createHeightMap;
