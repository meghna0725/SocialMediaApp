import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
    const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/posts');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <strong>Post ID:</strong> {post[0]} <br />
            <strong>User ID:</strong> {post[1]} <br />
            <strong>Timestamp:</strong> {post[2]} <br />
            <strong>Content:</strong> {post[3]} <br />
            <strong>Like Count:</strong> {post[4]} <br />
            <strong>Comment Count:</strong> {post[5]} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;