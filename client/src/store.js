import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage
};

const middleware = [thunk];
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = persistReducer(persistConfig, rootReducer);
const store = createStore(
  reducers,
  {},
  storeEnhancers(applyMiddleware(...middleware)),
);

// store.subscribe(() => saveStateToLocalStorage(store.getState()));
store.subscribe(() => console.log('State from Store: ',store.getState()));

const persistor = persistStore(store);

export { store, persistor };
