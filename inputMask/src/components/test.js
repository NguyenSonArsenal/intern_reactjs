import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

const enhance = compose(
  withState('email', 'setEmail', 'vanson297@gmail.com'),
  withHandlers({
    onChange: ({ setEmail }) => event => {
      setEmail((event) => 'xxx'),
        console.log('aaa')
    },
    submit: props => () => console.log(props),
  })
);

const EmailForm = ({ email, onChange, submit }) =>
  <div>
    <input type='text' value={email} onChange={onChange} />
    <button type='button' onClick={submit} >Subscribe</button>
  </div>;

export { EmailForm };
export default enhance(EmailForm);
