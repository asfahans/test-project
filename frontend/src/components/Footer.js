import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col
            className='text-center py-3'
            style={{ fontSize: '11px', color: '#9b9b9b' }}
          >
            <strong>Test Project</strong> &copy; {new Date().getFullYear()}. All
            rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
