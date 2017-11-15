let initialLogsState = [
  {
    id: 1,
    email: 'admin@gmail.com',
    password: 'admin'
  },
  {
    id: 2,
    email: 'hai@gmail.com',
    password: 'hai'
  },
  {
    id: 9,
    email: 'chin@gmail.com',
    password: 'chin'
  },
  {
    id: 7,
    email: 'bay@gmail.com',
    password: 'bay'
  }
];

let logInitReducer = (state = initialLogsState, action) => {
  switch (action.type) {
    case 'RESET_PASSWORD':
      return resetPassword(state, action);
  }
  return state;
};

function resetPassword(state, action) {
  const email = action.email;
  const password = action.password;
  let users = [...state];

  users.map(function(user, index) {
    if (user.email == email) {
      users[index] = {...user, password: password};
      return users;
    }
  });

  return users;
}

export default logInitReducer;
