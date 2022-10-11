import * as THREE from 'three'
import { DoubleSide } from 'three';
import applyColor from './applyColor';
import mapping from './mapping';


const createPoints = (numPointsX,numPointsY) =>{

    const points = [];
    let pointIndex = 0;
    const pointsOfTriangleIndexes = [];

    const mapWidth = 100;
    const mapHeight = 100;


    let xCordinate = 0 - (mapWidth/2);
    let zCordinate = 0 - (mapHeight/2);

    const stepX =  mapWidth / numPointsX;
    const stepY = mapHeight / numPointsY;

    for(let i = 0;i < numPointsY; i++){
        xCordinate = 0 - (100/2);
        for(let j = 0;j < numPointsX; j++){
            
            const y = 0;
            points.push({x:xCordinate,y:y,z:zCordinate});

            if(j < numPointsX-1 && i < numPointsY-1){

                //index of points in points array
                let indexOfPoint1 = pointIndex;
                let indexOfPoint2 = pointIndex + numPointsX + 1;
                let indexOfPoint3 = pointIndex + numPointsX;
                pointsOfTriangleIndexes.push({a:indexOfPoint1,b:indexOfPoint2,c:indexOfPoint3});

                //set the points for 2 triangles
                indexOfPoint1 = pointIndex + numPointsX + 1;
                indexOfPoint2 = pointIndex;
                indexOfPoint3 = pointIndex + 1;
                
                pointsOfTriangleIndexes.push({a:indexOfPoint1,b:indexOfPoint2,c:indexOfPoint3});
            }
            pointIndex++;
            xCordinate+=stepX;
        }
        zCordinate+=stepY;
    }

    return {points , pointsOfTriangleIndexes };
}
const createMesh = (points , pointsOfTriangleIndexes) =>{

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

        const color1={r:0,g:0,b:0};
        const color2={r:0,g:0,b:0};
        const color3={r:0,g:0,b:0};

        if(y1 <= 3){
            y1=3;
            points[pointsOfTriangleIndexes[i].a].y=3;
        }
        if(y2 <= 3){
            y2=3;
            points[pointsOfTriangleIndexes[i].b].y=3;
        }
        if(y3 <= 3){
            y3=3;
            points[pointsOfTriangleIndexes[i].c].y=3;
        }
        applyColor(y1,y2,y3,color1,color2,color3);

        bufferGeometryColors.push(
            color1.r,color1.g,color1.b,
            color2.r,color2.g,color2.b,
            color3.r,color3.g,color3.b
        )

        trianglePositions.push(
            x1,y1,z1,
            x2,y2,z2,
            x3,y3,z3
        )
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( trianglePositions, 3 ));
    bufferGeometry.computeVertexNormals();
    bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute( bufferGeometryColors, 3 ));

    return bufferGeometry;
}

const createHeightMap = (numPointsX,numPointsY,scene) =>{

    const imgOfHeightMap = new Image(); 
    imgOfHeightMap.addEventListener('load',()=>{
        //load img on canvas so can read pixes from it later
        const canvas = document.createElement('canvas');
        canvas.width=numPointsX;
        canvas.height=numPointsY;

        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imgOfHeightMap,0,0,numPointsX,numPointsY);

        //get pixes from canvas
        const pixelsOfHeightMapImg = ctx.getImageData(0,0,numPointsX,numPointsY);
        const { points , pointsOfTriangleIndexes } = createPoints(numPointsX,numPointsY);
        
        let j = 0;
        for(let i = 0; i < pixelsOfHeightMapImg.data.length ; i+=4){
            const color = {r:0,g:0,b:0};
            color.r = pixelsOfHeightMapImg.data[i];
            color.g = pixelsOfHeightMapImg.data[i+1];
            color.b = pixelsOfHeightMapImg.data[i+2];
            
            const grey = (color.r + color.b + color.g)/3;
        
            points[j].y = mapping(grey,0,255,0,20);
            j++;
        }
        
        const bufferGeometry = createMesh(points,pointsOfTriangleIndexes);
        const material = new THREE.MeshStandardMaterial({
            side:DoubleSide,
            vertexColors:true
        });
            
        const mesh = new THREE.Mesh(bufferGeometry,material);
        scene.add(mesh);

    },false)

    imgOfHeightMap.src = '/heightMaps/test.png';
    
}

export default createHeightMap;
