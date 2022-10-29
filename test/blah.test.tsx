import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as TableControl } from '../stories/TableControl.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TableControl
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
    />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
