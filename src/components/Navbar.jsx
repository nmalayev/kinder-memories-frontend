import React, { Component } from 'react';
import { Input, Menu, Segment, Search } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class Navbar extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === 'new-memory') {
    }
    this.props.history.push(`/${name}`);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing className='ui fixed top sticky' size='massive'>
        <Menu.Item
          name='timeline'
          active={activeItem === 'timeline'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='memories'
          active={activeItem === 'memories'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='new-memory'
          active={activeItem === 'new-memory'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input
              onChange={_.debounce(this.props.handleSearch, 500)}
              icon='search'
              placeholder='Search...'
              showNoResults={false}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
