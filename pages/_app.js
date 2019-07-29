import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import decode from 'jwt-decode';
import configureStore from '../redux/configureStore';
import { setCurrentUser } from '../redux/actions/user';
import { setAuthorizationToken } from '../utils/api';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { store, req } = ctx;
    if (req) {
      const { cookie } = req.headers;
      const token = cookie.split('=')[1];
      const userData = decode(token);
      try {
        store.dispatch(setCurrentUser({ authenticated: true, data: userData }));
        setAuthorizationToken(token);
      } catch (err) {
        store.dispatch(setCurrentUser({ authenticated: false, data: null }));
      }
    }
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(MyApp);