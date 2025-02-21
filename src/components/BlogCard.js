import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BlogCard({ post, handleEdit, handleDelete }) {
  const { _id, title, content, author, comments, createdAt } = post;

  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mt-2">Author: {author}</Card.Subtitle>
          <Card.Text>{content.substring(0, 100)}...</Card.Text>
          <Card.Subtitle>Comments: {comments.length}</Card.Subtitle>
          <Card.Text style={{ color: "gray", fontSize: "14px" }}>
            {new Date(createdAt).toLocaleDateString()}
          </Card.Text>
          <Link className="btn btn-secondary me-2" to={`/posts/${_id}`}>
            Read More
          </Link>
          <Button variant="warning" onClick={() => handleEdit(post)} className="me-2">
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(_id)}>Delete</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
