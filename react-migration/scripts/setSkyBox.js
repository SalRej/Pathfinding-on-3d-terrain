import * as THREE from 'three';
const setSkyBox = (scene) =>{
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      './skybox/right.jpg',
      './skybox/left.jpg',
      './skybox/top.jpg',
      './skybox/bottom.jpg',
      './skybox/front.jpg',
      './skybox/back.jpg'
    ])
    // scene.background=texture;
    scene.background=new THREE.Color(0xffffff);
}

export default setSkyBox;