// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import { Link, NavLink } from "react-router-dom";
// import { useContext } from "react";
// import UserContext from "../context/UserContext";

// export default function AppNavbar() {
//   const { user } = useContext(UserContext);

//   return (
//     <Navbar expand="lg" className="bg-dark navbar-dark">
//       <Container fluid className="ms-0 d-flex justify-content-between">
//         {/* Brand Logo */}
//         <Navbar.Brand as={NavLink} to="/home">
//           <img
//             src="/images/CTRL3.png"
//             alt="Logo"
//             style={{ height: "40px", width: "auto" }}
//           />
//         </Navbar.Brand>

//         {/* Navbar Toggle for Mobile */}
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />

//         {/* Navbar Links */}
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link as={NavLink} to="/" exact="true">
//               <i className="bi bi-house"> Home</i>
//             </Nav.Link>

//             <Nav.Link as={NavLink} to="/blogs" exact="true">
//               <i className="bi bi-film"> Blogs</i>
//             </Nav.Link>

//             {(user.id !== null) ? 
//           user.isAdmin 
//             ? <>
//                 <Nav.Link as={Link} to="/logout"><i className="bi bi-box-arrow-right">Logout</i></Nav.Link>
//               </>
//             : <>
//                 <Nav.Link as={NavLink} to="/profile" exact="true"><i className="bi bi-person-circle"></i> Profile</Nav.Link>
//                 <Nav.Link as={NavLink} to="/logout" exact="true"><i className="bi bi-box-arrow-right">Logout</i></Nav.Link>
//               </>
//           : <>
//               <Nav.Link as={NavLink} to="/login" exact="true"><i className="bi bi-box-arrow-in-right"></i> Login</Nav.Link>
//               <Nav.Link as={NavLink} to="/register" exact="true"><i className="bi bi-person-plus"></i> Register</Nav.Link>
//             </>
//         }
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
//   </Navbar>
//   );
// }

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';


export default function AppNavbar() {
  const { user } = useContext(UserContext);

  
  // const logoPath = "/images/logo.jpg"; 

  return (
    <Navbar expand="lg" className="bg-warning navbar-light">
  <Container fluid className="ms-0 d-flex justify-content-between">
    
    <Navbar.Brand as={NavLink} to="/home">
      {/*<img
        src="/images/CTRL3.png"
        alt="Shop Logo"
        style={{ height: '40px', width: 'auto' }}
      />*/}
    </Navbar.Brand>

    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto"> 
        <Nav.Link as={NavLink} to="/" exact="true"><i className="bi bi-house">Home</i></Nav.Link>

        <Nav.Link as={NavLink} to="/blogs" exact="true"><i className="bi bi-box-seam">Blogs</i></Nav.Link>

        {(user && user.id !== null) ? 
          user.isAdmin 
            ? <>
                <Nav.Link as={Link} to="/logout"><i className="bi bi-box-arrow-right">Logout</i></Nav.Link>
              </>
            : <>
                <Nav.Link as={NavLink} to="/profile" exact="true"><i className="bi bi-person-circle"></i> Profile</Nav.Link>
                <Nav.Link as={NavLink} to="/logout" exact="true"><i className="bi bi-box-arrow-right">Logout</i></Nav.Link>
              </>
          : <>
              <Nav.Link as={NavLink} to="/login" exact="true"><i className="bi bi-box-arrow-in-right"></i> Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register" exact="true"><i className="bi bi-person-plus"></i> Register</Nav.Link>
            </>
        }
      </Nav>
    </Navbar.Collapse>
  </Container>
  </Navbar>


  );
}
