import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setError('');
      const res = await axios.get('http://localhost:3000/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (payload) => {
    try {
      setError('');
      const res = await axios.post('http://localhost:3000/users', payload);
      setUsers((prev) => [res.data, ...prev]);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create user');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Users</h2>
      <AddUser onCreate={handleCreate} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
}

export default App;
