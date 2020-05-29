import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const saveStateToLocalStorage = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

const loadStateFromLocalStorage = () => {
  const serializedState = localStorage.getItem('state');
  if (serializedState === null) return undefined;
  return JSON.parse(serializedState);
};

const middleware = [thunk];
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const presistedState = loadStateFromLocalStorage();

const store = createStore(
  rootReducer,
  presistedState,
  storeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(() => saveStateToLocalStorage(store.getState()));
store.subscribe(() => console.log('State from Store: ',store.getState()));

export default store;

