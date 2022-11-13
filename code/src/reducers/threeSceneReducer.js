import initScene from "../../scripts/initScene";

const threeSceneReducer = (state = null,action) =>{
    switch(action.type){
        case 'INIT_THREE_SCENE':
            const initObjects = initScene();
            return{
                camera:initObjects.camera,
                scene:initObjects.scene,
                renderer:initObjects.renderer,
                controls:initObjects.controls
            }
        case 'ENABLE_SCENE_CONTROLS':{
            const {controls} = state;
            controls.enabled = true;
            return {...state,controls:controls}
        }
        case 'DISABLE_SCENE_CONTROLS':{
            const {controls} = state;
            controls.enabled = false;
            return {...state,controls:controls}
        }
        default : return state
    }
}

export default threeSceneReducer;