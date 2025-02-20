import React, { useState, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Notyf } from "notyf";

export default function UpdatePost({ show, handleClose, post, refreshPosts }) {
  const [postData, setPostData] = useState({ title: post?.title || "", content: post?.content || "" });
  const notyf = useMemo(() => new Notyf(), []);

  // Handle update post
  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`https://blogapi-o0fk.onrender.com/posts/updatePost/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (response.ok && data.updatedPost) {
        notyf.success("Post updated successfully.");
        refreshPosts();
        handleClose();
      } else {
        notyf.error(data.message || "Error updating post.");
      }
    } catch (error) {
      notyf.error("Error updating post.");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={postData.content}
              onChange={(e) => setPostData({ ...postData, content: e.target.value })}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleUpdatePost}>Update Post</Button>
      </Modal.Footer>
    </Modal>
  );
}
