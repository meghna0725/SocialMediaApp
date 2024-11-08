import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteComment = () => {

    const [commentIds, setCommentIds] = useState<number[]>([]);
    const [selectedComment, setSelectedComment] = useState<number | undefined>();

    useEffect(() => {
        // Fetch comment ids
        axios.get<{ comment_id: number }[]>("http://0.0.0.0:8000/getallcommentids")
            .then(response => {
                const extractedCommentIds = response.data.map((item: { comment_id: number }) => item.comment_id);
                setCommentIds(extractedCommentIds);
            })
            .catch(error => {
                console.error("Error fetching comment ids:", error);
            });

    }, []);

    const handleClick = () => {
        // Send POST request to delete comment
        axios.post("http://0.0.0.0:8000/deletecomment", {
            comment_id: selectedComment,
        })
        .then(response => {
            console.log("Comment deleted successfully:", response.data);
        })
        .catch(error => {
            console.error("Error deleting comment:", error);
        });
    };

    return(
        <div>
            {/* Dropdown for selecting comment id */}
            <select onChange={(e) => setSelectedComment(parseInt(e.target.value))}>
                <option value="">Select Comment</option>
                {commentIds.map(commentId => (
                    <option key={commentId} value={commentId}>{commentId}</option>
                ))}
            </select>
            <button onClick={handleClick}>Delete Comment</button>
        </div>
    )
}

export default DeleteComment;