import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import createNoiseMap from './scripts/createNoiseMap';
import setSkyBox from './scripts/setSkyBox';
import setLight from './scripts/setLight';
import djikstra from './scripts/djikstra';
import colorPath from './scripts/colorPath';
import resetMapColor from './scripts/resetMapColor';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 70, 10);
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );      
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();


setLight(scene)
// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
// scene.add( pointLightHelper );
setSkyBox(scene);

//gui for map generation control
const scale ={s:70};
const octaves = {o:4};
const persistance ={p:0.5};
const lacunarity = {l:2};

const worldData = createNoiseMap(100,100,scale.s,octaves.o,persistance.p,lacunarity.l,scene,camera,renderer);
//const path = djikstra(worldData.graph,1,1000);
//console.log(path);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

//colors the path
//colorPath(path,scene);

let path =[];
function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(pointer,camera);

  const intersect = raycaster.intersectObjects(scene.children);

  resetMapColor(path,scene);
  path = djikstra(worldData.graph,0,worldData.graph[intersect[0].faceIndex].id);
  colorPath(path,scene);

  //colors neighbors on clicked triangle
  // worldData.graph[intersect[0].faceIndex].neighborId.forEach(index=>{

  //     const j =index*9;
  //     for(let i = 0;i<9;i++){
  //       scene.children[3].geometry.attributes.color.array[j+i]=1;
  //     }

  // })

  scene.children[3].geometry.getAttribute('color').needsUpdate=true;

}
window.addEventListener( 'mousedown', onPointerMove );



function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
};

animate();