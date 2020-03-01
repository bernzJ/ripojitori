import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Loading = ({ callback, delay }) => {
  setTimeout(() => callback(), delay);
  return (
    <Container>
      <Row className="justify-content-center">
        <Spinner animation="grow" />
      </Row>
    </Container>
  );
};

export default Loading;

Loading.propTypes = {
  callback: PropTypes.func.isRequired,
  delay: PropTypes.number
};

Loading.defaultProps = {
  delay: 1000
};
