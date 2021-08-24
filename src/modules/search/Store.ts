import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {SearchReducer} from './SearchReducer';

const appReducers = combineReducers({
    apiReducer: SearchReducer,
});

const rootReducer = (state, action) => appReducers(state, action);
export const Store = createStore(rootReducer, applyMiddleware(thunk));
