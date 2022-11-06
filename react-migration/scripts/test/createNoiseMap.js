import * as THREE from 'three';
import { DoubleSide } from 'three';
import generateWorld from './generateWorld';
import createNoiseValues from './createNoiseValues';
import createGraph from './createGraph';

const createNoiseMap = (generationVariables,scene,doAnimate) =>{
    
    doAnimate=false;
    const {
        height,
        width,
        scaleY
    } = generationVariables;
    
    const mapWidth = 100;
    const mapHeight = 100;

    const sclaeMuliplayerX = width/mapWidth;
    const sclaeMuliplayerY = height/mapHeight;

    const geometry = createNoiseValues(generationVariables,sclaeMuliplayerX,sclaeMuliplayerY);

    const material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,vertexColors: true
    });

    const mesh = new THREE.Mesh(geometry,material);
    mesh.name='worldMesh';
    scene.add(mesh);
    let graph = createGraph(geometry,width);
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
        // const data ={
        //     width,
        //     scene,
        //     material,
        //     scaleY
        // }
        // graph = generateWorld(data);
    }

    return graph;
}
export default createNoiseMap;