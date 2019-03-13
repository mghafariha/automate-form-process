import thunk from 'redux-thunk';

import {fields,formName} from './reducers'
import {  
    combineReducers,
    createStore,
    applyMiddleware
  } from 'redux';
  
const reducers = combineReducers({  
    fields,
    formName,
  });
  
const store = createStore(reducers, applyMiddleware(thunk))
export default store