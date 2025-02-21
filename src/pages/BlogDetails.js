import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BlogDetails() {
  const { id: postId } = useParams(); // Ensure we're using the correct parameter name
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await fetch(`https://blogapi-o0fk.onrender.com/posts/getPost/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPost(data); // ✅ Fix: Use data directly
      } else {
        console.error("Error fetching post details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  if (!post) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-2xl font-bold">{post.title}</Card.Title>
          <Card.Subtitle className="mb-2">Author: {post.author}</Card.Subtitle>
          <Card.Text>{post.content}</Card.Text>
          <Card.Text className="text-muted">
            Published on: {new Date(post.createdAt).toLocaleDateString()}
          </Card.Text>
          <Link to="/blogs" className="btn btn-primary">Back to Posts</Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
