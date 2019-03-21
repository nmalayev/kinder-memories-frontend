import React, { Component } from 'react';
import { Input, Menu, MenuHeader } from 'semantic-ui-react';
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
      <Menu
        pointing
        className='ui top fixed inverted teal icon menu main'
        size='massive'
      >
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
          // active={activeItem === 'new-memory'}
          onClick={this.handleItemClick}
        />
        {!this.props.currentUser ? (
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='sign-up'
              active={activeItem === 'sign-up'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        ) : (
          <Menu.Menu position='right'>
            <Menu.Item name='logout' onClick={this.props.logout}>
              Logout
            </Menu.Item>
            <Menu.Item>
              <Input
                onChange={_.debounce(this.props.handleSearch, 500)}
                icon='search'
                placeholder='Search...'
              />
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

export default withRouter(Navbar);
