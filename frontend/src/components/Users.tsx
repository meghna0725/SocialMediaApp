import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>User ID:</strong> {user[0]} <br />
            <strong>Username:</strong> {user[1]} <br />
            <strong>Email:</strong> {user[2]} <br />
            <strong>Password:</strong> {user[3]} <br />
            <strong>Bio:</strong> {user[4]} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;