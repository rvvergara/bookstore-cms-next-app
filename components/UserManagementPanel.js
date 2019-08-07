import Link from 'next/link';

const UserManagementPanel = ({ user }) => {
  const {
    first_name,
    last_name, username, email, access_level,
  } = user;

  return (
    <tr key={user.id}>
      <td className="name-col">
        <Link href={`/users/${username}`}>
          <a>
            {`${user.first_name} ${user.last_name}`}
          </a>
        </Link>
      </td>
      <td className="username-col">
        {user.username}
      </td>
      <td className="email-col">{user.email}</td>
      <td className="admin-col">{user.access_level}</td>
    </tr>
  );
};

export default UserManagementPanel;
