//  store.js

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const inititalState = {};

const store = createStore(
        rootReducer, 
        inititalState, 
        compose(applyMiddleware(thunk)));

export default store;

//compose(applyMiddleware(thunk), 
//window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));
