import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import combineReducers from './reducers';
import { persistStore, autoRehydrate } from 'redux-persist';

import { AsyncStorage } from 'react-native';

export default function configureStore(configurationCompleted) {

    const enhancer = compose(
        autoRehydrate(),
        composeWithDevTools()
    );

    const reducers = combineReducers();

    // Create Store method takes
    // enhancer
    // reducers


    let store = createStore(reducers, enhancer);
    persistStore(store, { storage: AsyncStorage }, () => {
        if (configurationCompleted) {
            configurationCompleted(store);
        }
    });

    if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // If you have other enhancers & middlewares
  // update the store after creating / changing to allow devTools to use them
  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }


    return store;
};