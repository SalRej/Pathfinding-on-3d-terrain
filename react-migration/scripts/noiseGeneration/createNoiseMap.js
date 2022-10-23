import * as THREE from 'three';
import { DoubleSide } from 'three';
import animateWorldGeneration from './animateWorldGeneration';
import generateWorld from './generateWorld';
import createNoiseValues from './createNoiseValues';

const createNoiseMap = (generationVariables,scene,doAnimate) =>{
    
    const {
        height,
        width,
        scaleY
    } = generationVariables;
    
    const mapWidth = 100;
    const mapHeight = 100;

    const sclaeMuliplayerX = width/mapWidth;
    const sclaeMuliplayerY = height/mapHeight;

    const {points , pointsOfTriangleIndexes } = createNoiseValues(generationVariables,sclaeMuliplayerX,sclaeMuliplayerY);

    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,vertexColors: true
    });

    let graph;
    if(doAnimate===true){
        const data ={
            geometry,
            material,
            scene,
            width,
            height,
            points,
            pointsOfTriangleIndexes,
            scaleY
        }
        graph = animateWorldGeneration(data);
    }else{
        const data ={
            pointsOfTriangleIndexes,
            points,
            width,
            scene,
            geometry,
            material,
            scaleY
        }
        graph = generateWorld(data);
    }

    return graph;
}
export default createNoiseMap;