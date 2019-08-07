import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { listUsers } from '../redux/actions/user';
import UserManagementPanel from './UserManagementPanel';

const UserList = ({ users }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Admin?</th>
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
