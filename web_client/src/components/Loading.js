import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Loading = ({ callback, delay }) => {
  setTimeout(() => (callback ? callback() : null), delay);
  return (
    <Container>
      <Row className="justify-content-center">
        <Spinner animation="grow" />
      </Row>
    </Container>
  );
};

Loading.propTypes = {
  callback: PropTypes.func,
  delay: PropTypes.number
};

Loading.defaultProps = {
  callback: null,
  delay: 1000
};

export default Loading;
