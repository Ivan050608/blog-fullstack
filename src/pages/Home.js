import Banner from '../components/Banner';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  const bannerData = {
    title: "Welcome to My Blog",
    description: "Discover insightful articles, latest trends, and inspiring stories.",
    backgroundImage: "https://source.unsplash.com/1600x900/?nature,writing", // Replace with a blog-related image
  };

  // Sample featured posts
  const featuredPosts = [
    {
      id: 1,
      title: "The Power of Mindful Living",
      excerpt: "Discover how mindfulness can transform your daily life and improve well-being.",
      image: "https://source.unsplash.com/400x250/?meditation,mindfulness",
    },
    {
      id: 2,
      title: "Top 10 Travel Destinations for 2025",
      excerpt: "Explore breathtaking destinations to add to your travel bucket list.",
      image: "https://source.unsplash.com/400x250/?travel,destination",
    },
    {
      id: 3,
      title: "Mastering Productivity in a Digital Age",
      excerpt: "Learn essential strategies to stay focused and maximize efficiency.",
      image: "https://source.unsplash.com/400x250/?productivity,work",
    },
  ];

  return (
    <>
      <Banner data={bannerData} />

      <Container className="mt-5">
        <h2 className="text-center mb-4">Featured Posts</h2>
        <Row>
          {featuredPosts.map((post) => (
            <Col md={4} key={post.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.excerpt}</Card.Text>
                  <Link to={`/blogs`} className="btn btn-primary">Read More</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
