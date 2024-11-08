import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FormData {
  username: string;
  email: string;
  password: string;
  bio: string;
  user_id: number;
}

const UpdateUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const [userIds, setUserIds] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | undefined>();

  useEffect(() => {
    axios.get<{ user_id: number }[]>("http://0.0.0.0:8000/getalluserids")
      .then(response => {
        const extractedUserIds = response.data.map((item: { user_id: number }) => item.user_id);
        setUserIds(extractedUserIds);
      })
      .catch(error => {
        console.error("Error fetching user ids:", error);
      });
  }, []);

  const handleSubmitForm = () => {
    if (!selectedUser) {
      console.error("No user selected.");
      return;
    }

    const formData: FormData = { username, email, password, bio, user_id: selectedUser };

    axios.post('http://localhost:8000/updateuser', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <p>To add a user, enter the details in the input boxes, refresh the page, and see your new user reflected in the users table above!</p>
      {/* Dropdown for selecting user */}
      <select onChange={(e) => setSelectedUser(parseInt(e.target.value))}>
        <option value="">Select User</option>
        {userIds.map(userId => (
          <option key={userId} value={userId}>{userId}</option>
        ))}
      </select>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      <button onClick={handleSubmitForm}>Submit</button>
    </div>
  );
};

export default UpdateUser;
