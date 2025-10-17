import React from 'react';

function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p>No users yet.</p>;
  }

  return (
    <ul className="list">
      {users.map((u) => (
        <li className="list-item" key={u.id}>
          <span className="user-name">{u.name}</span>
          <span>{u.email}</span>
        </li>
      ))}
    </ul>
  );
}

export default UserList;



