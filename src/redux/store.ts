import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers'
import { globalState, globalAction, globalDispatch } from './reduxInterfaces';

const store: Store<globalState, globalAction> & {
  dispatch: globalDispatch
} = createStore(reducer, applyMiddleware(thunk))

export default store
