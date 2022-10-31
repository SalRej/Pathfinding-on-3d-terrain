import alea from 'alea';
import { createNoise2D } from 'simplex-noise';
import mapping from '../mapping';
import * as THREE from 'three';
import applyColor from './applyColor';

const createNoiseValues = (generationVariables,sclaeMuliplayerX,sclaeMuliplayerY) =>{

    const { persistance, lacunarity, seed, offsetX, offsetY ,width ,height} = generationVariables;

    const prng = alea(seed);
    const noise2D = createNoise2D(prng);
    let myrng = new Math.seedrandom(seed);

    const octvaeOffsets = [];
    const {octaves} = generationVariables;

    for(let i=0;i<octaves;i++){
        const oX = (myrng()*20000 - 10000) + Number(offsetX);
        const oY = (myrng()*20000 - 10000) + Number(offsetY);
        octvaeOffsets.push({x:oX,y:oY});
    }

    let pointIndex = 0;

    const mapWidth = 100;
    const mapHeight = 100;

    let xCordinate = 0 - (mapWidth/2);
    let zCordinate = 0 - (mapHeight/2);

    const stepX = mapWidth / width;
    const stepY = mapHeight / height;

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const indecies = [];

    for(let i = 0; i < height; i++){
        xCordinate = 0 - (mapHeight/2);

        for(let j = 0; j < width;j++){

            let amplitude = 1;
            let frequancy = 1;
            let noise = 0;

            for(let k=0;k<octaves;k++){
                let  {scale} = generationVariables;
                
                const scaleX = sclaeMuliplayerX * scale;
                const scaleY = sclaeMuliplayerY * scale;

                const sampleX = j / scaleX * frequancy + octvaeOffsets[k].x;
                const sampleY = i / scaleY * frequancy + octvaeOffsets[k].y;
                
                noise += noise2D(sampleX,sampleY) * amplitude;

                amplitude *= persistance;
                frequancy *= lacunarity;
            }
            

            if(j < width-1 && i < height-1){

                //index of points in points array
                let indexOfPoint1 = pointIndex;
                let indexOfPoint2 = pointIndex + width + 1;
                let indexOfPoint3 = pointIndex + width;
                indecies.push(indexOfPoint1,indexOfPoint2,indexOfPoint3);
                //set the points for 2 triangles
                indexOfPoint1 = pointIndex + width + 1;
                indexOfPoint2 = pointIndex;
                indexOfPoint3 = pointIndex + 1;
                
                indecies.push(indexOfPoint1,indexOfPoint2,indexOfPoint3);
            }
            
            const color = {r:0,g:0,b:0};
            const noiseForColoring = mapping(noise,-1,1,0,1);

            //levels the watter
            if(noiseForColoring <= 0.15){
                noise = mapping(0.15,0,1,-1,1);
            }
            applyColor(noiseForColoring,color)
            noise=mapping(noise,-1,1,0,generationVariables.scaleY);

            positions.push(xCordinate,noise,zCordinate);
            colors.push(color.r,color.g,color.b);

            pointIndex++;
            xCordinate+=stepX;
        }
        zCordinate+=stepY;
    }

    geometry.setIndex(indecies);
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ));
    geometry.computeVertexNormals();//needed for light to work
    geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ));

    return geometry;
}
export default createNoiseValues;