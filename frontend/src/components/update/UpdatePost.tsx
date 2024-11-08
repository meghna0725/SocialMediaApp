import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FormData {
  content: string;
  user_id: number;
  post_id: number;
}

const UpdatePost: React.FC = () => {

    const [postIds, setPostIds] = useState<number[]>([]);
    const [userIds, setUserIds] = useState<number[]>([]);
    const [content, setContent] = useState('');
    const [selectedPost, setSelectedPost] = useState<number | undefined>();
    const [selectedUser, setSelectedUser] = useState<number | undefined>();

  useEffect(() => {
    // Fetch post ids
    axios.get<{ post_id: number }[]>("http://0.0.0.0:8000/getallpostids")
        .then(response => {
            const extractedPostIds = response.data.map((item: { post_id: number }) => item.post_id);
            setPostIds(extractedPostIds);
        })
        .catch(error => {
            console.error("Error fetching post ids:", error);
        });

    // Fetch user ids
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
    if (!selectedUser || !selectedPost) {
      console.error("User or post not selected.");
      return;
    }
  
    const formData: FormData = { post_id: selectedPost, user_id: selectedUser, content } as FormData;
  
    axios.post('http://localhost:8000/updatepost', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  

  return (
    <div>
      
      {/* Dropdown for selecting post */}
      <select onChange={(e) => setSelectedPost(parseInt(e.target.value))}>
                <option value="">Select Post</option>
                {postIds.map(postId => (
                    <option key={postId} value={postId}>{postId}</option>
                ))}
        </select>
      
      {/* Dropdown for selecting user */}
      <select onChange={(e) => setSelectedUser(parseInt(e.target.value))}>
        <option value="">Select User</option>
        {userIds.map(userId => (
          <option key={userId} value={userId}>{userId}</option>
        ))}
      </select>
      <input type="text" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmitForm}>Submit</button>
    </div>
  );
};

export default UpdatePost;
