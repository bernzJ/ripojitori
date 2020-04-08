import { remote } from 'electron';
import React from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize
} from '@fortawesome/free-solid-svg-icons';

const DragBar = () => {
  const [isMaximized, setMaximized] = React.useState(false);
  return (
    <Bar>
      <Container fluid>
        <Row className="justify-content-end align-items-center">
          <IconContainer
            onClick={() => remote.BrowserWindow.getFocusedWindow().minimize()}
          >
            <FontAwesomeIconWrapper
              size="2x"
              color="#3e454d"
              icon={faWindowMinimize}
            />
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
            <FontAwesomeIconWrapper
              size="2x"
              color="#3e454d"
              icon={faWindowMaximize}
            />
          </IconContainer>
          <IconContainer
            onClick={() => remote.BrowserWindow.getFocusedWindow().close()}
          >
            <FontAwesomeIconWrapper
              size="2x"
              color="#3e454d"
              icon={faWindowClose}
            />
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
const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  &&& {
    color: #3e454d;
    transition: color 0.2s linear;
  }
  &&&:hover {
    color: #fff;
  }
`;
