import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FormData {
  user_id: string;
  content: string;
}

const AddPost: React.FC = () => {
  const [user_id, setUserID] = useState('');
  const [content, setContent] = useState('');
  const [userIDs, setUserIDs] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user IDs from the endpoint
    axios.get('http://localhost:8000/getalluserids')
      .then(response => {
        // Extract user IDs from the response data
        const fetchedUserIDs = response.data.map((user: { user_id: string }) => user.user_id);
        // Set the user IDs in the state
        setUserIDs(fetchedUserIDs);
      })
      .catch(error => {
        console.error('Error fetching user IDs:', error);
      });
  }, []);

  const handleSubmit = () => {
    // Submit the form data
    const formData: FormData = { user_id, content };
    console.log(formData);

    // Send POST request to add post
    axios.post('http://localhost:8000/addpost', formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });
  };

  return (
    <div>
      {/* Dropdown for user selection */}
      <select value={user_id} onChange={(e) => setUserID(e.target.value)}>
        <option value="">Select User</option>
        {/* Map through userIDs array to populate dropdown options */}
        {userIDs.map(userID => (
          <option key={userID} value={userID}>{userID}</option>
        ))}
      </select>
      {/* Text input for content */}
      <input type="text" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddPost;
