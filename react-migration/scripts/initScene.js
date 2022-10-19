import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import setLight from "./setLight";
import setSkyBox from "./setSkyBox";

const initScene = () =>{
    const width = window.innerWidth/2;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    camera.position.set( 0, 100, 70);
    camera.lookAt( 0, 0, 0 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height ); 
    
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();

    setLight(scene);
    setSkyBox(scene);
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        if(window.innerWidth<=600){
            camera.aspect = window.innerWidth / (window.innerHeight/2);
            camera.updateProjectionMatrix();
    
            renderer.setSize( window.innerWidth, window.innerHeight/2 );
            
        }else if(window.innerWidth<=1100){
            
            camera.aspect = window.innerWidth / (window.innerHeight/1.5);
            camera.updateProjectionMatrix();
    
            renderer.setSize( window.innerWidth, window.innerHeight/1.5 );
        }
        else{
            camera.aspect = (window.innerWidth/2) / window.innerHeight;
            camera.updateProjectionMatrix();
    
            renderer.setSize( window.innerWidth/2, window.innerHeight );
        }

    }
    return {scene,renderer,camera,controls};
}
export default initScene;