import { Button, Row, Col } from 'react-bootstrap';

export default function Banner({ data }) {
  return (
    <div 
      className="banner" 
      style={{
        backgroundImage: `url(${data.backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '100px 20px',
      }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-4">{data.title}</h1>
          <p className="lead">{data.description}</p>
          <Button variant="light" href="/blog">Explore Blog</Button>
        </Col>
      </Row>
    </div>
  );
}
