import {combineReducers} from 'redux';
import todoStateReducer from "../modules/todo/TodoState";

const reducers = {
  todo: todoStateReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
