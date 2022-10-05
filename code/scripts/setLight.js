import * as THREE from 'three';

const setLight = (scene)=>{
    const ambient = new THREE.AmbientLight(0xffffff,0.5);
    const directional = new THREE.DirectionalLight(0xffffff,0.5);
    directional.position.set(0,50,50);
    directional.target.position.set(0,0,0);
    directional.castShadow = true;


    scene.add(directional);
    scene.add(directional.target);
    scene.add(ambient);
}
export default setLight;