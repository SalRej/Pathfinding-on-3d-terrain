import * as THREE from 'three';

const getTriangleClicked = (mouseX,mouseY,renderer,camera,scene) =>{

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const rendererSize = new THREE.Vector2();
    renderer.getSize(rendererSize);

    // calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
    pointer.x = ( mouseX / rendererSize.x ) * 2 - 1;
    pointer.y = - ( mouseY / rendererSize.y ) * 2 + 1;
    raycaster.setFromCamera(pointer,camera);
    
    const intersect = raycaster.intersectObjects(scene.children);

    if(intersect[0]!=undefined){
        return intersect[0].faceIndex;
    }else return null;
}

export default getTriangleClicked;