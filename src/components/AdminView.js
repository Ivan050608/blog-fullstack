// import { useState, useEffect } from "react";
// import { Button, Table, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
// // Import edit and archive components if needed
// // import EditMovie from "./EditMovie";
// // import ArchiveMovie from "./ArchiveMovie";

// export default function AdminView({ moviesData, fetchData }) {
//     const [movies, setMovies] = useState([]);

//     // Map moviesData to table rows
//     useEffect(() => {
//         console.log(moviesData);

//         if (moviesData && moviesData.length > 0) {
//             const moviesArr = moviesData.map((movie) => (
//                 <tr key={movie._id}>
//                     <td>{movie._id}</td>
//                     <td>{movie.title}</td>
//                     <td>{movie.director}</td>
//                     <td>{movie.year}</td>
//                     <td>{movie.genre}</td>
//                     <td className={movie.isActive ? "text-success" : "text-danger"}>
//                         {movie.isActive ? "Available" : "Unavailable"}
//                     </td>
//                     {/* Uncomment when EditMovie and ArchiveMovie components are available */}
//                     {/* <td><EditMovie movie={movie} fetchData={fetchData} /></td> */}
//                     {/* <td><ArchiveMovie movie={movie} isActive={movie.isActive} fetchData={fetchData}/></td> */}
//                 </tr>
//             ));

//             setMovies(moviesArr);
//         }
//     }, [moviesData, fetchData]);

//     return (
//         <>
//             <h1 className="text-center my-4">Admin Dashboard</h1>
            
//             <div className="text-center my-3">
//                 <Row className="justify-content-center">
//                     <Col xs={12} md="auto">
//                         <Link to="/add-movie">
//                             <Button variant="primary">Add New Movie</Button>
//                         </Link>
//                     </Col>
//                     <Col xs={12} md="auto">
                        
//                     </Col>
//                 </Row>
//             </div>

//             <Table striped bordered hover responsive>
//                 <thead>
//                     <tr className="text-center">
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Director</th>
//                         <th>Year</th>
//                         <th>Genre</th>
//                         <th>Availability</th>
//                         {/* <th colSpan="2">Actions</th> */}
//                     </tr>
//                 </thead>
//                 <tbody>{movies}</tbody>
//             </Table>
//         </>
//     );
// }
