import Head from 'next/head';
import Header from './Header';

const Layout = ({ children, title }) => (
  <div className="root">
    <Head>
      <title>
        Bookstore CMS |
        {' '}
        {title}
      </title>
    </Head>
    <Header />
    { children }
  </div>
);

export default Layout;
