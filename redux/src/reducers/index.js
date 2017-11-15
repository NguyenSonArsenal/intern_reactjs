// reducers/index.js

import {combineReducers} from 'redux';
import skillsReducer from './skills';

const reducer = combineReducers({
  skills: skillsReducer
});

export default reducer;
