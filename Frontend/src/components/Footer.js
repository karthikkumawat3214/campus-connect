import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; 2024 
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.2)', // Change the background color to something else with low opacity
};

export default Footer;
