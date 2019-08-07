import Link from 'next/link';

const UserManagementPanel = ({ user }) => {
  const {
    first_name,
    last_name, username, email, access_level,
  } = user;

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
      </td>
      <td className="username-col">
        {username}
      </td>
      <td className="email-col">{email}</td>
      <td className="admin-col">{access_level}</td>
    </tr>
  );
};

export default UserManagementPanel;
