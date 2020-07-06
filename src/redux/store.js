/*
redux最核心的管理对象store
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// 向外默认暴露store
export default createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
