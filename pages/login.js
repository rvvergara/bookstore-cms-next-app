import { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/thunks/user';
import InputWrapper from '../components/InputWrapper';

export const Login = ({
  login,
  errors,
}) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(errors ? errors.message : errors);

  const loginUser = (e) => {
    e.preventDefault();
    setEmailOrUsername('');
    setPassword('');
    login({ email_or_username: emailOrUsername, password })
      .then(() => {
        Router.push('/');
      })
      .catch(() => setErrorMessage(errors));
  };

  return (
    <div>
      <div className="form-wrapper">
        <form className="form user-form">
          {errors && <div className="error">{errorMessage}</div>}
          <InputWrapper
            inputValue={emailOrUsername}
            labelValue="Username/Email:"
            setInput={setEmailOrUsername}
            type="text"
            inputId="email"
          />
          <InputWrapper
            inputValue={password}
            labelValue="Password:"
            setInput={setPassword}
            type="password"
            inputId="password"
          />
          <div className="btn-wrapper">
            <button
              type="submit"
              className="user-form__btn"
              onClick={loginUser}
            >
              Login
            </button>
            <button
              type="button"
              className="user-form__btn"
              onClick={() => history.push('/signup')}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.getInitialProps = ({ store }) => ({ errors: store.errors });

export default connect(
  state => state,
  { login },
)(Login);
