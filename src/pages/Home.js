import Banner from '../components/Banner';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Home() {
  const bannerData = {
    title: "Welcome to My Blog",
    description: "Discover insightful articles, latest trends, and inspiring stories.",
    backgroundImage: "https://plus.unsplash.com/premium_photo-1684581214880-2043e5bc8b8b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D", 
  };

 
  const featuredPosts = [
    {
      id: 1,
      title: "The Power of Mindful Living",
      excerpt: "Discover how mindfulness can transform your daily life and improve well-being.",
      image: "https://mindowl.org/wp-content/uploads/2023/07/Blog-Banners-2022-17-1024x576.jpg",
      url: "https://medium.com/@abhishekv965580/the-power-of-mindful-living-how-to-cultivate-presence-in-a-distracted-world-f3866568e7b2", 
    },
    {
      id: 2,
      title: "Top 10 Travel Destinations for 2025",
      excerpt: "Explore breathtaking destinations to add to your travel bucket list.",
      image: "https://i.ytimg.com/vi/xcPCrq--peE/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=eLPVDaaQybY&ab_channel=RyanShirley", 
    },
    {
      id: 3,
      title: "Mastering Productivity in a Digital Age",
      excerpt: "Learn essential strategies to stay focused and maximize efficiency.",
      image: "https://media.licdn.com/dms/image/v2/D5612AQHKklKtc6sStw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1727066093484?e=2147483647&v=beta&t=tR4oPq6De38dLaWsyV75ZoScAfi_c7xSI_zPgdkvw2w",
      url: "https://www.linkedin.com/pulse/mastering-productivity-digital-age-strategies-tips-tools-7w9zc/", 
    },
  ];

  return (
    <>
      <Banner data={bannerData} />

      <Container className="mt-5">
        <h2 className="text-center mb-4">Featured Blogs</h2>
        <Row>
          {featuredPosts.map((post) => (
            <Col md={4} key={post.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.excerpt}</Card.Text>
                  <a href={post.url} className="btn btn-dark" target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
