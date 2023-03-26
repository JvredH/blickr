import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import photosReducer from './photosReducer';
import commentsReducer from './commentsReducer';
import tagsReducer from './tagsReducer';
import usersDataReducer from './usersDataReducer';

const rootReducer = combineReducers({
  session,
  photos: photosReducer,
  comments: commentsReducer,
  tags: tagsReducer,
  usersData: usersDataReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
