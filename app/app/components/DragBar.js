import { remote } from 'electron';
import React from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faExpand } from '@fortawesome/free-solid-svg-icons';

const DragBar = () => {
  const [isMaximized, setMaximized] = React.useState(false);
  return (
    <Bar>
      <Container fluid>
        <Row className="justify-content-end align-items-center">
          <IconContainer
            onClick={() => remote.BrowserWindow.getFocusedWindow().close()}
          >
            <FontAwesomeIcon size="2x" color="#eb4034" icon={faWindowClose} />
          </IconContainer>
          <IconContainer
            onClick={() => {
              const win = remote.BrowserWindow.getFocusedWindow();
              if (isMaximized) {
                win.setSize(1495, 880);
                setMaximized(false);
              } else {
                win.maximize();
                setMaximized(true);
              }
            }}
          >
            <FontAwesomeIcon size="2x" color="#fff" icon={faExpand} />
          </IconContainer>
        </Row>
      </Container>
    </Bar>
  );
};

export default DragBar;

const Bar = styled.div`
  &&& {
    -webkit-user-select: none;
    -webkit-app-region: drag;
    background-color: #343a40;
    width: 100%;
    height: 60px;
  }
`;
const IconContainer = styled.div`
  &&& {
    margin: 10px;
    -webkit-app-region: no-drag;
  }
`;
