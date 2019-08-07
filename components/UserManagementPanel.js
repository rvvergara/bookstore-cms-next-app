import Link from 'next/link';

const UserManagementPanel = ({ user }) => {
  const {
    first_name,
    last_name, username, email, access_level,
  } = user;

  return (
    <tr key={user.id}>
      <td>{`${user.first_name} ${user.last_name}`}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.access_level}</td>
    </tr>
  );
};

export default UserManagementPanel;
