function animate(THREEScene) {
    requestAnimationFrame( animate);
    // console.log(THREEScene);
    THREEScene.controls.update();
    THREEScene.renderer.render( THREEScene.scene, THREEScene.camera);
};
export default animate;