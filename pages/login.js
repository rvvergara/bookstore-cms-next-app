import { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import redirect from 'next-redirect';
import { login } from '../redux/thunks/user';
import InputWrapper from '../components/InputWrapper';
import Layout from '../components/Layout';
import initialize from '../utils/initialize';

export const Login = ({
  login,
  errors,
}) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = (e) => {
    e.preventDefault();
    login({ email_or_username: emailOrUsername, password })
      .then((data) => {
        if (data) Router.push('/');
        setEmailOrUsername('');
        setPassword('');
      });
  };

  return (
    <Layout title="Log in">
      <div className="form-wrapper">
        <form className="form user-form">
          {errors && <div className="error">{errors.message}</div>}
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
              onClick={() => Router.push('/signup')}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

Login.getInitialProps = (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  if (currentUser.authenticated) {
    return redirect(ctx, '/');
  }
};

export default connect(
  state => state,
  { login },
)(Login);
