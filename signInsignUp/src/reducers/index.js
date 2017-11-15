import {combineReducers} from 'redux';

import initLogReducer from './authenticate/ResetPassword';
import authInitReducer from './authenticate/Login';

const reducer = combineReducers({
  initLogs: initLogReducer,
  isLogin: authInitReducer
});

export default reducer;
