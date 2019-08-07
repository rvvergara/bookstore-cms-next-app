import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { listUsers } from '../redux/actions/user';
import UserManagementPanel from './UserManagementPanel';

const UserList = ({ users }) => (
  <table>
    <thead>
      <tr>
        <th className="name-col">Name</th>
        <th className="username-col">Username</th>
        <th className="email-col">Email</th>
        <th className="admin-col">Admin?</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map(user => (
          <UserManagementPanel
            key={user.id}
            user={user}
          />
        ))
    }
    </tbody>
  </table>
);

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps)(UserList);
