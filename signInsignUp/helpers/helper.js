exports.checkExitEmail = (users, email) => {
  const length = users.length;
  if (length > 0) {
    for (let i = 0; i < length; i++) {
      if (users[i].email === email) {
        return true;
      }
    }
  }
  return false;
};

exports.validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
