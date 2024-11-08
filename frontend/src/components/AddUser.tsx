import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  username: string;
  email: string;
  password: string;
  bio: string;
}

const AddUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmitForm = () => {
    const formData: FormData = { username, email, password, bio };

    axios.post('http://localhost:8000/adduser', formData)
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
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      <button onClick={handleSubmitForm}>Submit</button>
    </div>
  );
};

export default AddUser;
