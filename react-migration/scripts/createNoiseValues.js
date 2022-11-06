import alea from 'alea';
import { createNoise2D } from 'simplex-noise';
import mapping from './mapping';

const createNoiseValues = (generationVariables,points,width,height,sclaeMuliplayerX,sclaeMuliplayerY) =>{

    const { persistance, lacunarity, seed, offsetX, offsetY} = generationVariables;

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

    const noiseValues = [];
    let index = 0;
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width;j++){

            let amplitude = 1;
            let frequancy = 1;
            let noise = 0;
            for(let k=0;k<octaves;k++){
                let  {scale} = generationVariables;
                
                const scaleX = sclaeMuliplayerX * scale;
                const scaleY =sclaeMuliplayerY * scale;
                const sampleX = j / scaleX * frequancy + octvaeOffsets[k].x;
                const sampleY = i / scaleY * frequancy + octvaeOffsets[k].y;
                
                noise += noise2D(sampleX,sampleY) * amplitude;

                amplitude *= persistance;
                frequancy *= lacunarity;
            }
            
            points[index].y = noise;
            index++;
        }
    }

    // return noiseValues;
        
}
export default createNoiseValues;