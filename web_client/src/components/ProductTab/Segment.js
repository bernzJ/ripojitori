/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormInput = styled.input`
  &&& {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

const Segment = ({ Segment, handleChange }) => {
  const init = {
    SegmentId: -1,
    SegmentName: ''
  };
  const [state, setState] = useState(init);

  useEffect(() => {
    const { SegmentId, SegmentName } = Segment || init;
    setState({
      SegmentId,
      SegmentName
    });
  }, [Segment]);

  const { SegmentId, SegmentName } = state;

  return (
    <FormInput
      className="w-100"
      placeholder="Segment"
      value={SegmentName}
      onChange={e => {
        setState({ ...state, SegmentName: e.target.value });
        handleChange({ SegmentId, SegmentName: e.target.value });
      }}
    />
  );
};

Segment.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default Segment;
