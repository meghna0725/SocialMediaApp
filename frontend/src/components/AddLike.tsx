import React, { useState, useEffect } from "react";
import axios from "axios";

const AddLike = () => {
    const [postIds, setPostIds] = useState<number[]>([]);
    const [userIds, setUserIds] = useState<number[]>([]);
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

    const handleLikeClick = () => {
        // Send POST request to add like
        axios.post("http://0.0.0.0:8000/addlike", {
            user_id: selectedUser,
            post_id: selectedPost
        })
        .then(response => {
            console.log("Like added successfully:", response.data);
        })
        .catch(error => {
            console.error("Error adding like:", error);
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
            <button onClick={handleLikeClick}>Add Like</button>
        </div>
    );
};

export default AddLike;
