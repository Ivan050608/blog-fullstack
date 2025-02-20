import React, { useEffect, useState, useMemo } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Notyf } from "notyf";
import AddPost from "../components/AddPost";
import UpdatePost from "../components/UpdatePost"; // Import UpdatePost

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const notyf = useMemo(() => new Notyf(), []);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch("https://blogapi-o0fk.onrender.com/posts/getPosts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.posts) {
        setPosts(data.posts);
      } else {
        notyf.error(data.message || "Error fetching posts.");
      }
    } catch (error) {
      notyf.error("Error fetching posts.");
      console.error(error);
    }
  };

  // Handle delete post
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`https://blogapi-o0fk.onrender.com/posts/deletePost/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
        notyf.success("Post deleted successfully.");
      } else {
        notyf.error(data.message || "Error deleting post.");
      }
    } catch (error) {
      notyf.error("Error deleting post.");
      console.error(error);
    }
  };

  // Open update modal & set selected post
  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowUpdateModal(true);
  };

  return (
    <>
      <Card className="p-4 shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="text-center text-2xl font-bold">Blog Posts</Card.Title>
          <div className="text-center mb-3">
            <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Post</Button>
          </div>
          <Row>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Col sm={12} md={6} lg={4} key={post._id} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                      <Button variant="secondary" onClick={() => handleEditPost(post)} className="me-2">
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeletePost(post._id)}>Delete</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts available.</p>
            )}
          </Row>
        </Card.Body>
      </Card>

      {/* Add Post Modal */}
      <AddPost show={showAddModal} handleClose={() => setShowAddModal(false)} refreshPosts={fetchPosts} />

      {/* Update Post Modal */}
      {selectedPost && (
        <UpdatePost
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          post={selectedPost}
          refreshPosts={fetchPosts}
        />
      )}
    </>
  );
}
