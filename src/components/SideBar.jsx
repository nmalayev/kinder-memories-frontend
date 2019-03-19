import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import '../css/SideBar.css';

const memoryPosterOptions = [
  {
    key: 'everyone',
    text: 'Everyone',
    value: 'everyone'
  },
  {
    key: 'parent',
    text: 'Parents',
    value: 'parent'
  },
  {
    key: 'grandparent',
    text: 'Grandparents',
    value: 'grandparent'
  },
  {
    key: 'sibling',
    text: 'Siblings',
    value: 'sibling'
  },
  {
    key: 'friend',
    text: 'Friends',
    value: 'friend'
  }
];

const timeSortOptions = [
  {
    key: 'chrono',
    text: 'Earliest',
    value: 'chrono'
  },
  {
    key: 'reverseChrono',
    text: 'Most Recent',
    value: 'reverseChrono'
  }
];

export default class MenuExampleVerticalText extends Component {
  state = { activeItem: 'closest' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div id='sidebar'>
        {/* <span> */}
        Show me memories by{' '}
        <Dropdown
          inline
          options={memoryPosterOptions}
          defaultValue={memoryPosterOptions[0].value}
        />
        <br />
        {/* </span> */}
        {/* <span> */}
        Sort by{' '}
        <Dropdown
          inline
          options={timeSortOptions}
          defaultValue={timeSortOptions[0].value}
        />
        {/* </span> */}
      </div>
    );
  }
}
