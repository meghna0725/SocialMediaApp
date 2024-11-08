import React, { useEffect, useState } from "react";
import axios from "axios";

const Likes = () => {
    const [likes, setLikes] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/likes');
        setLikes(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Like List</h1>
      <ul>
        {likes.map((likes, index) => (
          <li key={index}>
            <strong>Like ID:</strong> {likes[0]} <br />
            <strong>User ID:</strong> {likes[1]} <br />
            <strong>Post ID:</strong> {likes[2]} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Likes;