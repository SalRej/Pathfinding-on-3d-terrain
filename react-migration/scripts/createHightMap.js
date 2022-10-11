import * as THREE from 'three'
import { DoubleSide } from 'three';
import applyColor from './applyColor';
const createMesh = (width,height) =>{

    const points = [];
    let pointIndex = 0 ;
    const pointsOfTriangleIndexes = [];
    for(let z = 0;z < height; z++){
        for(let x = 0;x < width; x++){
            const y = 0;
            points.push({x:x,y:y,z:z});
            pointIndex++;

            if(x < width-2 && z < height-2){

                //index of points in points array
                let indexOfPoint1 = pointIndex;
                let indexOfPoint2 = pointIndex + width + 1;
                let indexOfPoint3 = pointIndex + width;
                pointsOfTriangleIndexes.push({a:indexOfPoint1,b:indexOfPoint2,c:indexOfPoint3});

                //set the points for 2 triangles
                indexOfPoint1 = pointIndex + width + 1;
                indexOfPoint2 = pointIndex;
                indexOfPoint3 = pointIndex + 1;
                
                pointsOfTriangleIndexes.push({a:indexOfPoint1,b:indexOfPoint2,c:indexOfPoint3});
            }

        }
    }

    const trianglePositions = [];
    console.log(points.length);
    for(let i = 0;i < pointsOfTriangleIndexes.length ; i++){
        const x1 = points[pointsOfTriangleIndexes[i].a].x;
        const x2 = points[pointsOfTriangleIndexes[i].b].x;
        const x3 = points[pointsOfTriangleIndexes[i].c].x;

        const y1 = points[pointsOfTriangleIndexes[i].a].z;
        const y2 = points[pointsOfTriangleIndexes[i].b].z;
        const y3 = points[pointsOfTriangleIndexes[i].c].z;

        const z1 = points[pointsOfTriangleIndexes[i].a].z;
        const z2 = points[pointsOfTriangleIndexes[i].b].z;
        const z3 = points[pointsOfTriangleIndexes[i].c].z;

        trianglePositions.push(
            x1,y1,z1,
            x2,y2,z2,
            x3,y3,z3
        )
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( trianglePositions, 3 ));
    return bufferGeometry;
}

const createHeightMap = (width,height,scene) =>{

    const imgOfHeightMap = new Image(); 
    imgOfHeightMap.addEventListener('load',()=>{
        //load img on canvas so can read pixes from it later
        const canvas = document.createElement('canvas');
        canvas.width=imgOfHeightMap.width
        canvas.height=imgOfHeightMap.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(imgOfHeightMap,0,0);

        //get pixes from canvas
        const pixelsOfHeightMapImg = ctx.getImageData(0,0,imgOfHeightMap.width,imgOfHeightMap.height);
        document.body.appendChild(canvas);

        for(let i = 0;i < pixelsOfHeightMapImg.data.length ; i+=4){
            const color = {r:0,g:0,b:0};
            color.r = pixelsOfHeightMapImg[i];
            color.g = pixelsOfHeightMapImg[i+1];
            color.b = pixelsOfHeightMapImg[i+2];
        }

    },false)

    imgOfHeightMap.src = '/heightMaps/Heightmap.png';
    
    
    const bufferGeometry = createMesh(width,height);
    const material = new THREE.MeshStandardMaterial({
        color:0xff0000,
        flatShading:true,
        side:DoubleSide
    });
        
    const mesh = new THREE.Mesh(bufferGeometry,material);
    scene.add(mesh);

}

export default createHeightMap;
