import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './AuthReducer/authReducer';
import mainReducer from './MainReducer/mainReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunkMiddleware))
);

export default store;
