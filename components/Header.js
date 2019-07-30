import Link from 'next/link';
import { connect } from 'react-redux';
import Router from 'next/router';
import { logout } from '../redux/thunks/user';

export const Header = ({ logout, currentUser }) => {
  const handleLogout = () => {
    logout();
    Router.push('/');
  };
  return (
    <header className="panel-bg">
      <h1 className="bookstore-cms">
        <Link href="/">
          <a>Bookstore App</a>
        </Link>
      </h1>
      <div className="user-wrapper">
        {currentUser.authenticated && (
        <span>
          <Link
            href={`/users/${currentUser.data.username}`}
          >
            <a>
              {currentUser.data.first_name}
              {' '}
              {currentUser.data.last_name}
            </a>
          </Link>
        </span>
        )}
        {currentUser.authenticated && currentUser.data.access_level > 1 && (
        <Link
          href="/admin"
        >
          <a className="logout-btn">
            Admin Dashboard
          </a>
        </Link>
        )}
        <button
          type="button"
          className="logout-btn"
          onClick={currentUser.authenticated ? handleLogout : () => Router.push('/login')}
        >
          {currentUser.authenticated ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </header>
  );
};
const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { logout })(Header);
