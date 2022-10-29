import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Container, Row, Col } from 'react-bootstrap';

import { TableControl } from '../.';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <Container>
      <Row className='mt-3'>
        <Col>
          <TableControl
            header={[
              { key: "id", name: "#" },
              { key: "name", name: "Name" },
              { key: "description", name: "Description" }
            ]}
            itens={[
              { id: 1, name: "Name 1", description: "Description 1" },
              { id: 2, name: "Name 2", description: "Description 2" },
              { id: 3, name: "Name 3", description: "Description 3" },
              { id: 4, name: "Name 4", description: "Description 4" },
              { id: 5, name: "Name 5", description: "Description 5" }
            ]}
          />
        </Col>
      </Row>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
