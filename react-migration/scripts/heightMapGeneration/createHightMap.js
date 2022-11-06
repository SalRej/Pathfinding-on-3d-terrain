import * as THREE from 'three'
import { DoubleSide } from 'three';
import applyColor from '../applyColor';
import mapping from '../mapping';
import createPoints from './createPoints';
import createGraph from '../graph/createGraph';

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
    const colors = [];
    let j = 1;
    for(let i = 0; i < pixelsOfHeightMapImg.data.length ; i+=4){
        const color = {r:0,g:0,b:0};
        color.r = pixelsOfHeightMapImg.data[i];
        color.g = pixelsOfHeightMapImg.data[i+1];
        color.b = pixelsOfHeightMapImg.data[i+2];
        
        const grey = (color.r + color.b + color.g)/3;
        
        const normalizedY = mapping(grey,0,255,0,1);
        points[j] = mapping(normalizedY,0,1,0,scaleY);

        const colorToApply = {r:0,g:0,b:0};
        applyColor(normalizedY,colorToApply);
        colors.push(colorToApply.r,colorToApply.g,colorToApply.b);
        j+=3;

    }
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setIndex(pointsOfTriangleIndexes);
    bufferGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ));
    bufferGeometry.computeVertexNormals();
    bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ));

    const material = new THREE.MeshStandardMaterial({
        side:DoubleSide,
        vertexColors:true
    });
    
    const graph = createGraph(bufferGeometry,numPointsX);
    const mesh = new THREE.Mesh(bufferGeometry,material);
    mesh.name="worldMesh";
    scene.add(mesh); 
    return graph; 
}

export default createHeightMap;
