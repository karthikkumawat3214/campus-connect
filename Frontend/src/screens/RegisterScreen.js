import React, { useState, useEffect } from 'react';
import { Spinner, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { verify } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userVerification = useSelector((state) => state.userVerification);
  const { verification, loading, error } = userVerification;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    userData,
    loading: loadingRegister,
    error: errorRegister,
  } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userData) {
      history.push(redirect);
    }
  }, [history, redirect, userData]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else {
      dispatch(verify(name, email, password, contact, address));
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle} className="text-center mb-4">SIGN UP</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <small className="text-muted">Be sure to enter your valid email address</small>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group controlId="contact">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mobile No"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            style={inputStyle}
          />
          <small className="text-muted">Be sure to enter a correct 10 digit number starting with 9</small>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already Have an Account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className="btn btn-secondary ml-2"
          >
            Login
          </Link>
        </Col>
      </Row>

      {loading && <Spinner animation="border" role="status" className="mx-auto mt-4" />}
      {verification && <Message variant="success" className="mt-4">{verification.response}</Message>}
      {error && <Message variant="danger" className="mt-4">{error}</Message>}
      {message && <Message variant="danger" className="mt-4">{message}</Message>}
      {errorRegister && <Message variant="danger" className="mt-4">{errorRegister}</Message>}
      {loadingRegister && <Loader />}
    </div>
  );
};

export default RegisterScreen;

const containerStyle = {
  backgroundColor: 'rgba(135, 206, 235, 0.5)', // Sky blue color with 50% opacity
  padding: '20px',
  borderRadius: '10px',
  fontWeight: 'bold',
  fontSize: '15px',
  color: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};


const titleStyle = {
  fontSize: '50px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center', // Center align text within the title
};

const inputStyle = {
  borderRadius: '10px',
  fontWeight: 'bold',
  color: '#000',
  backgroundColor: '#fff',
  textAlign: 'center', // Center align text within the input
};

