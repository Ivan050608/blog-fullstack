import { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import MovieCard from "./MovieCard";
// import ProductSearch from "./ProductSearch";

export default function UserView({ moviesData }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(moviesData);

    const moviesArr = moviesData.map((movie) => {
      // Only render movies that are available (modify condition as needed)
      if (movie.isActive === true) {
        return <MovieCard movie={movie} key={movie._id} />;
      } else {
        return null;
      }
    });

    setMovies(moviesArr);
  }, [moviesData]);

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Row className="mt-3 mb-3">
          <h1 className="text-center">Movies</h1>
          {movies}
        </Row>
      </Container>
    </>
  );
}
