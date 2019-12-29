import {applyMiddleware, createStore, compose} from 'redux';
import middleware from './middleware';
import reducer from './reducer';

const store = createStore(reducer, {}, applyMiddleware(...middleware));

export default store;
