import { combineReducers } from "redux";
import pathFindingVariablesReducer from "./pathFindingVariablesReducer";
import terrafomigVariablesReducer from "./terraformingVariablesReducer";
import threeSceneReducer from "./threeSceneReducer";
import colorsReducer from "./colorsReducer";
const allReducers = combineReducers({
    pathFindingVariables : pathFindingVariablesReducer,
    terraformingVariables :terrafomigVariablesReducer,
    THREEScene:threeSceneReducer,
    colorValues:colorsReducer
});
export default allReducers;
