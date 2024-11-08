import React, { useState, useEffect } from "react";
import axios from "axios";

const AddFollow = () => {
    const [followerIds, setFollowerIds] = useState<number[]>([]);
    const [userIds, setUserIds] = useState<number[]>([]);
    const [selectedFollower, setSelectedFollower] = useState<number | undefined>();
    const [selectedUser, setSelectedUser] = useState<number | undefined>();

    useEffect(() => {
        // Fetch follower ids
        axios.get<{ user_id: number }[]>("http://0.0.0.0:8000/getallfollowerids")
            .then(response => {
                const extractedFollowerIds = response.data.map((item: { user_id: number }) => item.user_id);
                setFollowerIds(extractedFollowerIds);
            })
            .catch(error => {
                console.error("Error fetching follower ids:", error);
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
        axios.post("http://0.0.0.0:8000/addfollow", {
            user_id: selectedUser,
            follower_id: selectedFollower
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
            {/* Dropdown for selecting user */}
            <select onChange={(e) => setSelectedUser(parseInt(e.target.value))}>
                <option value="">Select User</option>
                {userIds.map(userId => (
                    <option key={userId} value={userId}>{userId}</option>
                ))}
            </select>
            {/* Dropdown for selecting post */}
            <select onChange={(e) => setSelectedFollower(parseInt(e.target.value))}>
                <option value="">Select Follower</option>
                {followerIds.map(followerId => (
                    <option key={followerId} value={followerId}>{followerId}</option>
                ))}
            </select>
            <button onClick={handleLikeClick}>Follow User</button>
        </div>
    );
};

export default AddFollow;
