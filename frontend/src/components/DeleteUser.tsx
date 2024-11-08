import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteUser = () => {
    const [userIds, setUserIds] = useState<number[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | undefined>();

    useEffect(() => {
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

    const handleClick = () => {
        // Send POST request to delete user
        axios.post("http://0.0.0.0:8000/deleteuser", {
            user_id: selectedUser,
        })
        .then(response => {
            console.log("User deleted successfully:", response.data);
        })
        .catch(error => {
            console.error("Error deleting user:", error);
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
            <button onClick={handleClick}>Delete User</button>
        </div>
    );
};

export default DeleteUser;
