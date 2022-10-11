import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import setLight from "./setLight";
import setSkyBox from "./setSkyBox";

const initScene = () =>{
    const width = window.innerWidth/2;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    camera.position.set( 0, 70, 10);
    camera.lookAt( 0, 0, 0 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height ); 
    
    const app = document.getElementById("root");
    // app.ap
    app.appendChild(renderer.domElement);
    document.body.appendChild( app );
    
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();

    setLight(scene);
    setSkyBox(scene);

    return {scene,renderer,camera,controls};
}
export default initScene;