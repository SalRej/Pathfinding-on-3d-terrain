import { combineReducers } from "redux";
import pathFindingVariablesReducer from "./pathFindingVariablesReducer";

const allReducers = combineReducers({
    pathFindingVariables : pathFindingVariablesReducer
});
export default allReducers;
