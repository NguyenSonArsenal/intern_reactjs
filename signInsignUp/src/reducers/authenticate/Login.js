let isLogin = false;

let authInitReducer = (state = isLogin, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
  }
  return state;
};

export default authInitReducer;
