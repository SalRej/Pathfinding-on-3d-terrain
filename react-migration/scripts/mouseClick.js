import * as THREE from 'three';

const mouseClick = (event,renderer,camera,scene) =>{

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const rendererSize = new THREE.Vector2();
    renderer.getSize(rendererSize);

    // calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
    pointer.x = ( event.clientX / rendererSize.x ) * 2 - 1;
    pointer.y = - ( event.clientY / rendererSize.y ) * 2 + 1;
    raycaster.setFromCamera(pointer,camera);
    
    const intersect = raycaster.intersectObjects(scene.children);
    // pathData= djikstra(worldData.graph,0,worldData.graph[intersect[0].faceIndex].id);

    console.log(intersect[0].faceIndex);
}

export default mouseClick;