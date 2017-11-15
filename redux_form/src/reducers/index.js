// reducers/index.js

import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import skillsReducer from './skills';
// import FormAddSkill from '../components/FormAddSkill';

const reducer = combineReducers({
  skills: skillsReducer,
  form: formReducer
});

export default reducer;
