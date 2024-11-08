import React, { useState, useEffect } from "react";
import axios from "axios";

const DeletePost = () => {

    const [postIds, setPostIds] = useState<number[]>([]);
    const [selectedPost, setSelectedPost] = useState<number | undefined>();

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

    }, []);

    const handleClick = () => {
        // Send POST request to delete post
        axios.post("http://0.0.0.0:8000/deletepost", {
            post_id: selectedPost,
        })
        .then(response => {
            console.log("Post deleted successfully:", response.data);
        })
        .catch(error => {
            console.error("Error deleting post:", error);
        });
    };

    return(
        <div>
            {/* Dropdown for selecting post id */}
            <select onChange={(e) => setSelectedPost(parseInt(e.target.value))}>
                <option value="">Select Post</option>
                {postIds.map(postId => (
                    <option key={postId} value={postId}>{postId}</option>
                ))}
            </select>
            <button onClick={handleClick}>Delete Post</button>
        </div>
    )
}

export default DeletePost;