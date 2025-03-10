import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import { UserProvider } from './context/UserContext';
// import MovieDocs from "./pages/MovieDocs";
import BlogPost from "./pages/BlogPost";
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Register from './pages/Register';
import BlogDetails from "./pages/BlogDetails";
import './index.css';


function App() {
  

  //Update the codes relating to global users states. We don't need isAdmin in this context.

      const [user, setUser] = useState({
            id: null,
            isAdmin: null
       });

    // Function for clearing localStorage on logout
    function unsetUser(){
        localStorage.clear();
    };


    useEffect(() => {
      // fetch(`http://localhost:4000/users/details`, {
      fetch(`https://blogapi-o0fk.onrender.com/users/details`, {  
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token') }`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.auth !== "Failed") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        } else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      })
    }, []);
    // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout
    useEffect(() => {
        console.log(user);
        console.log(localStorage);
    }, [user])


   return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              {/*<Route path="/movies" element={<MovieDocs />} />*/}
              
              <Route path="/home" element={<Home />} />
              <Route path="/blogs" element={<BlogPost />} />
              <Route path="/posts/:id" element={<BlogDetails />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              {/*<Route path="*" element={<Error />} />*/}
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App

