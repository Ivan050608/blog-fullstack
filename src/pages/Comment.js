import React, { useEffect, useState } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function Comment({ postId }) {
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState({ content: "", author: "" });

  const notyf = new Notyf();

  // Fetch all comments for a specific post
  const fetchComments = async () => {
    try {
      const response = await fetch("https://blogapi-o0fk.onrender.com/comments/getComments", {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setComments(data.comments.filter((comment) => comment.post === postId));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      notyf.error("Failed to fetch comments");
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Handle input change
  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  // Add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://blogapi-o0fk.onrender.com/comments/addComment", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...commentData, post: postId }),
      });
      const data = await response.json();
      if (response.ok) {
        setComments([...comments, data.comment]);
        setCommentData({ content: "", author: "" });
        notyf.success("Comment added successfully");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      notyf.error("Failed to add comment");
    }
  };

  // Delete comment
  const handleDeleteComment = async (id) => {
    try {
      const response = await fetch(`https://blogapi-o0fk.onrender.com/comments/deleteComment/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== id));
        notyf.success("Comment deleted successfully");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      notyf.error("Failed to delete comment");
    }
  };

  return (
    <div className="border p-4 mt-4">
      <h2 className="text-lg font-bold">Comments</h2>

      {/* Comment Form */}
      <form onSubmit={handleAddComment} className="mb-4">
        <textarea name="content" placeholder="Write a comment..." value={commentData.content} onChange={handleChange} className="border p-2 w-full mb-2" required />
        <input type="text" name="author" placeholder="Your Name" value={commentData.author} onChange={handleChange} className="border p-2 w-full mb-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Comment</button>
      </form>

      {/* Display Comments */}
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="border p-2 mb-2">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">By {comment.author}</p>
            <button onClick={() => handleDeleteComment(comment._id)} className="bg-red-500 text-white px-2 py-1 mt-1">Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
