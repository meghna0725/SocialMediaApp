import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteLike = () => {

    const [likeIds, setLikeIds] = useState<number[]>([]);
    const [selectedLike, setSelectedLike] = useState<number | undefined>();

    useEffect(() => {
        // Fetch like ids
        axios.get<{ like_id: number }[]>("http://0.0.0.0:8000/getalllikeids")
            .then(response => {
                const extractedLikeIds = response.data.map((item: { like_id: number }) => item.like_id);
                setLikeIds(extractedLikeIds);
            })
            .catch(error => {
                console.error("Error fetching like ids:", error);
            });

    }, []);

    const handleClick = () => {
        // Send POST request to add like
        axios.post("http://0.0.0.0:8000/deletelike/", {
            like_id: selectedLike,
        })
        .then(response => {
            console.log("Like deleted successfully:", response.data);
        })
        .catch(error => {
            console.error("Error deleting like:", error);
        });
    };

    return(
        <div>
            {/* Dropdown for selecting post */}
            <select onChange={(e) => setSelectedLike(parseInt(e.target.value))}>
                <option value="">Select Like</option>
                {likeIds.map(likeId => (
                    <option key={likeId} value={likeId}>{likeId}</option>
                ))}
            </select>
            <button onClick={handleClick}>Delete Like</button>
        </div>
    )
}

export default DeleteLike;