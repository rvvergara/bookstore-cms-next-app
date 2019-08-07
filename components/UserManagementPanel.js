import { useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Switch from 'react-switch';
import { updateAccount, fetchUsers } from '../redux/thunks/user';
import { setAuthorizationToken } from '../utils/api';

const UserManagementPanel = ({
  user, updateAccount, fetchUsers, token,
}) => {
  const {
    first_name,
    last_name, username, email, access_level, id,
  } = user;
  const [checked, setChecked] = useState(access_level > 1);

  const router = useRouter();

  const { page } = router.query;

  const handleChange = () => {
    setAuthorizationToken(token);
    const level = checked ? 1 : 2;
    setChecked(!checked);
    updateAccount({
      user: {
        access_level: level,
      },
    }, username)
      .then(() => fetchUsers(page));
  };

  return (
    <tr key={user.id}>
      <td className="name-col">
        <Link
          href="/users/[username]"
          as={`/users/${username}`}
        >
          <a>
            {`${first_name} ${last_name}`}
          </a>
        </Link>
        {
          access_level > 1 && (
            <small>Admin</small>)
        }
      </td>
      <td className="username-col">
        {username}
      </td>
      <td className="email-col">{email}</td>
      <td className="admin-col">
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
          id={`normal-switch-${id}`}
        />
      </td>
    </tr>
  );
};

const mapStateToProps = state => ({
  token: state.currentUser.data.token,
});

export default connect(mapStateToProps, { updateAccount, fetchUsers })(UserManagementPanel);
