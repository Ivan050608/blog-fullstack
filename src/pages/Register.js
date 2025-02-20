import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import {Notyf} from 'notyf';

import UserContext from '../context/UserContext';

export default function Register() {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();  // Initialize useNavigate for navigation
    const notyf = new Notyf();  // Create a new Notyf instance for notifications

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if ((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword])

    function registerUser(e) {
        e.preventDefault();

        fetch('https://blogapi-o0fk.onrender.com/users/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.message === "Registered Successfully") {
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setPassword('');
                setConfirmPassword('');

                notyf.success('Registration successful!'); // Display success notification
                navigate('/login');  // Redirect to login page
            } else if (data.message === "Email invalid") {
                notyf.error('Email is invalid');  // Error notification
            } else if (data.message === "Mobile number invalid") {
                notyf.error('Mobile number is invalid');  // Error notification
            } else if (data.message === "Password must be atleast 8 characters") {
                notyf.error('Password must be at least 8 characters');  // Error notification
            } else {
                notyf.error('Something went wrong.');  // General error notification
            }
        })
    }

    return (
        (user.id !== null) ?
        <Navigate to="/workouts" />
        :
        <Form onSubmit={(e) => registerUser(e)}>
        <h1 className="my-5 text-center">Register</h1>

        <Form.Group>
        <Form.Label>First Name:</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter First Name"
        required
        value={firstName}
        onChange={e => { setFirstName(e.target.value) }}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter Last Name"
        required
        value={lastName}
        onChange={e => { setLastName(e.target.value) }}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter Email"
        required
        value={email}
        onChange={e => { setEmail(e.target.value) }}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label>Mobile No:</Form.Label>
        <Form.Control
        type="number"
        placeholder="Enter 11 Digit No."
        required
        value={mobileNo}
        onChange={e => { setMobileNo(e.target.value) }}
        />
        </Form.Group>
        <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
        type="password"
        placeholder="Enter Password"
        required
        value={password}
        onChange={e => { setPassword(e.target.value) }}
        />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
        type="password"
        placeholder="Confirm Password"
        required
        value={confirmPassword}
        onChange={e => { setConfirmPassword(e.target.value) }}
        />
        </Form.Group>

        <div className="d-flex justify-content-center">
        {isActive ? (
            <Button variant="primary" type="submit" id="submitBtn" className="w-100">
            Submit
            </Button>
            ) : (
            <Button variant="primary" type="submit" id="submitBtn" className="w-100" disabled>
            Submit
            </Button>
            )}
            </div>
            </Form>
            

            )
}
