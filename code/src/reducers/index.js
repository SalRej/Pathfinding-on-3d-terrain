import { combineReducers } from "redux";
import pathFindingVariablesReducer from "./pathFindingVariablesReducer";
import terrafomigVariablesReducer from "./terraformingVariablesReducers";

const allReducers = combineReducers({
    pathFindingVariables : pathFindingVariablesReducer,
    terraformingVariables :terrafomigVariablesReducer
});
export default allReducers;
