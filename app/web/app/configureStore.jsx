import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import combineReducers from './reducers';
import { persistStore, autoRehydrate } from 'redux-persist';

export default function configureStore(configurationCompleted) {

  const enhancer = compose(
    autoRehydrate(),
    composeWithDevTools()
  );

  const reducers = combineReducers();

  let store = createStore(reducers, enhancer);
  persistStore(store, () => {
    if (configurationCompleted) {
      configurationCompleted(store);
    }
  });

  if (module.hot) {
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
