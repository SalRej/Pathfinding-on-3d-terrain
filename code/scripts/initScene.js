import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import setLight from "./setLight";
import setSkyBox from "./setSkyBox";
const initScene = () =>{
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 70, 10);
    camera.lookAt( 0, 0, 0 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );      
    document.body.appendChild( renderer.domElement );
    
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();

    setLight(scene);
    setSkyBox(scene);

    return {scene,renderer,camera,controls};
}
export default initScene;