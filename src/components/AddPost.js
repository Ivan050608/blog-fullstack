import React, { useState, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Notyf } from "notyf";

export default function AddPost({ show, handleClose, refreshPosts }) {
  const [postData, setPostData] = useState({ title: "", content: "", author: "" });
  const notyf = useMemo(() => new Notyf(), []);

  const handleAddPost = async () => {
    try {
      const response = await fetch(
        "https://blogapi-o0fk.onrender.com/posts/addPost", {
        // "http://localhost:4000/posts/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (response.ok && data.result) {
        notyf.success("Post added successfully.");
        setPostData({ title: "", content: "", author: "" });
        handleClose();
        refreshPosts();
      } else {
        notyf.error(data.message || "Error adding post.");
      }
    } catch (error) {
      notyf.error("Error adding post.");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Post</Modal.Title>
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
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={postData.author}
              onChange={(e) => setPostData({ ...postData, author: e.target.value })}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleAddPost}>Add Post</Button>
      </Modal.Footer>
    </Modal>
  );
}
