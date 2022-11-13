import { combineReducers } from "redux";
import pathFindingVariablesReducer from "./pathFindingVariablesReducer";
import terrafomigVariablesReducer from "./terraformingVariablesReducer";
import threeSceneReducer from "./threeSceneReducer";
const allReducers = combineReducers({
    pathFindingVariables : pathFindingVariablesReducer,
    terraformingVariables :terrafomigVariablesReducer,
    THREEScene:threeSceneReducer
});
export default allReducers;
