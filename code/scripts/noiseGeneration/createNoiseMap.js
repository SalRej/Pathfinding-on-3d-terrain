import * as THREE from 'three';
import { DoubleSide } from 'three';
import createNoiseValues from './createNoiseValues';
import createGraph from '../graph/createGraph';

const createNoiseMap = (generationVariables,colorValues,scene) =>{
    
    const {
        height,
        width,
        scaleY
    } = generationVariables;
    
    const mapWidth = 100;
    const mapHeight = 100;

    const sclaeMuliplayerX = width/mapWidth;
    const sclaeMuliplayerY = height/mapHeight;

    const geometry = createNoiseValues(generationVariables,colorValues,sclaeMuliplayerX,sclaeMuliplayerY);

    const material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,vertexColors: true
    });

    const mesh = new THREE.Mesh(geometry,material);
    mesh.name='worldMesh';
    scene.add(mesh);
    let graph = createGraph(geometry,width,scaleY);

    return graph;
}
export default createNoiseMap;