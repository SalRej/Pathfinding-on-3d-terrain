import * as THREE from 'three';
import createNoiseMap from './scripts/createNoiseMap';
import djikstra from './scripts/djikstra';
import initScene from './scripts/initScene';

const initObjects = initScene();
const {scene} = initObjects;
const {camera} = initObjects;
const {renderer}= initObjects;
const {controls} = initObjects;

//gui for map generation control
const scale = 70;
const octaves = 4;
const persistance = 0.5;
const lacunarity = 2;

const worldData = createNoiseMap(100,100,scale,octaves,persistance,lacunarity,scene);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let pathData = [];
let vizualizingMesh;
let pathMesh;

let vizualizeMeshDrawRange = 0;
let pathDrawRange = 0;

function onMouseClick( event ) {
  
  // calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
  const rendererSize = new THREE.Vector2();
  renderer.getSize(rendererSize);
  
	pointer.x = ( event.clientX / rendererSize.x ) * 2 - 1;
	pointer.y = - ( event.clientY / rendererSize.y ) * 2 + 1;
  raycaster.setFromCamera(pointer,camera);
  
  const intersect = raycaster.intersectObjects(scene.children);
  // resetMapColor(path,scene);
  pathData= djikstra(worldData.graph,0,worldData.graph[intersect[0].faceIndex].id);
  
  vizualizeMeshDrawRange = 0;
  pathDrawRange = 0;

  const vizualizingMeshGeometry = new THREE.BufferGeometry();
  vizualizingMeshGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathData.vizualizingGeometry, 3 ));
  vizualizingMeshGeometry.computeVertexNormals();//needed for light to work
  
  const vizualizingMeshMaterial = new THREE.MeshStandardMaterial( {
    side: THREE.DoubleSide,color:0xffffff,opacity:0.4,transparent:true
  });

  vizualizingMesh = new THREE.Mesh( vizualizingMeshGeometry, vizualizingMeshMaterial );
  vizualizingMesh.name = "vizualizingMesh";
  scene.remove(scene.getObjectByName("pathMesh"));

  const pathGeometry = new THREE.BufferGeometry();
  pathGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pathData.path, 3 ));
  pathGeometry.computeVertexNormals();//needed for light to work
  
  const pathMaterial = new THREE.MeshStandardMaterial( {
    side: THREE.DoubleSide,color:0xff0000
  });

  pathMesh = new THREE.Mesh( pathGeometry, pathMaterial );
  pathMesh.name = "pathMesh";

  pathMesh.geometry.setDrawRange(0,pathDrawRange);
  scene.add(vizualizingMesh);
  scene.add(pathMesh);

  scene.children[3].geometry.getAttribute('color').needsUpdate=true;
  // console.log(scene)
  // console.log(mesh.geometry.attributes.position.array.length)
}
window.addEventListener( 'mousedown', onMouseClick );

// draw range

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );

  //vizualize the pathfinding
  if(pathData.vizualizingGeometry!=undefined){


    //vizualize the nodes visited by the djikstra algorithm in order
    if(vizualizeMeshDrawRange <= vizualizingMesh.geometry.attributes.position.array.length/3){

      vizualizingMesh.geometry.setDrawRange( 0, vizualizeMeshDrawRange );
      vizualizingMesh.geometry.attributes.position.needsUpdate = true;
      vizualizeMeshDrawRange+=300;

    }else{
      // vizualize the path
      scene.remove(scene.getObjectByName("vizualizingMesh"));
      if(pathDrawRange<=pathMesh.geometry.attributes.position.array.length/3){
        pathMesh.geometry.setDrawRange(0,pathDrawRange);
        pathMesh.geometry.attributes.position.needsUpdate=true;
        pathDrawRange+=5;
      }
    }
  }

};

animate();