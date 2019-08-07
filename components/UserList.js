import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { listUsers } from '../redux/actions/user';

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
          <tr key={user.id}>
            <td>{`${user.first_name} ${user.last_name}`}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.access_level}</td>
          </tr>
        ))
    }
    </tbody>
  </table>
);

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps)(UserList);
