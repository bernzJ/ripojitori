import React from 'react';
import styled from 'styled-components';
import { removeFlashMessage } from 'redux-flash-messages';
import { useDispatch, useSelector } from 'react-redux';

const FlashMessage = props => {
  const { messages } = useSelector(({ flashMessage }) => flashMessage);
  const dispatch = useDispatch();
  const onFlashMessageClick = flashMessage => {
    // flashMessage.onClick(flashMessage);
    dispatch(removeFlashMessage(flashMessage.id));
  };
  const renderMessage = message => {
    // @TODO log these: message.data
    return (
      <Flash
        debug={typeof message.data === 'string' ? message.data : ''}
        key={message.id}
        className={`animated bounceInLeft flash-message ${message.type}`}
        onClick={() => onFlashMessageClick(message)}
      >
        {message.text}
      </Flash>
    );
  };
  return messages.map(message => renderMessage(message));
};

export default FlashMessage;

const Flash = styled.div`
  &&& {
    position: absolute;
    top: 140px;
    width: 75%;
    left: 12.5%;
    text-align: left;
    z-index: 11;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
  &&&.ERROR {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
  &&&.SUCCESS {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  &&&.WARNING {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  }
`;
