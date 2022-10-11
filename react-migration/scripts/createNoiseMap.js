import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';
import mapping from './mapping';
import { DoubleSide } from 'three';
import animateWorldGeneration from './worldGeneration/animateWorldGeneration';
import generateWorld from './worldGeneration/generateWorld';
const createNoiseMap = (generationVariables,scene,doAnimate) =>{

    const points = [];    //points which will form triangle
    const colors = [];    //colors for each vertex
    const triangleIndexes = [];     //indexes of points to draw a triangle
    const positionOffset = 1;      //resolutuion of map
    
    const {
        height,
        width,
        persistance,
        lacunarity,
        seed,
        offsetX,
        offsetY,
        scaleY
    } = generationVariables;

    const prng = alea(seed);

    const noise2D = createNoise2D(prng);

    let vertexIndex = 0;
    let startY = 0 - height/2;
    let myrng = new Math.seedrandom(seed);

    const octvaeOffsets = [];
    const {octaves} = generationVariables;

    for(let i=0;i<octaves;i++){
        const oX = (myrng()*20000 - 10000) + Number(offsetX);
        const oY = (myrng()*20000 - 10000) + Number(offsetY);
        octvaeOffsets.push({x:oX,y:oY});
    }

    //generate noise values,points,triangleIndexes
    for(let i = 0; i < height; i++){
        let startX = 0 - width/2;
        for(let j = 0; j < width;j++){

            //work on noise values
            let amplitude = 1;
            let frequancy = 1;
            let noiseHeight = 0;
            for(let k=0;k<octaves;k++){
                const  {scale} = generationVariables;
                const sampleX = j / scale * frequancy + octvaeOffsets[k].x;
                const sampleY = i / scale * frequancy + octvaeOffsets[k].y;
                
                noiseHeight += noise2D(sampleX,sampleY) * amplitude;
                amplitude *= persistance;
                frequancy *= lacunarity;
            }

            points.push({x:startX,y:noiseHeight,z:startY});
            
            if(j < width-1 && i < height-1){
                triangleIndexes.push({a:vertexIndex,b:vertexIndex+width+1,c:vertexIndex+width});
                triangleIndexes.push({a:vertexIndex+width+1,b:vertexIndex,c:vertexIndex+1});
            }
            
            vertexIndex++;
            startX+=positionOffset;
        }
        startY+=positionOffset;
    }



    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,vertexColors: true
    });

    const positions = [];
    const graph = [];

    if(doAnimate===true){
        const data ={
            geometry,
            material,
            positions,
            graph,
            scene,
            width,
            height,
            points,
            triangleIndexes,
            colors,
            scaleY
        }
        animateWorldGeneration(data);
    }else{
        const data ={
            triangleIndexes,
            points,
            positions,
            graph,
            colors,
            width,
            scene,
            geometry,
            material,
            scaleY
        }
        generateWorld(data);
    }

    return{positions,colors,triangleIndexes,graph};
}
export default createNoiseMap;