import React, { Component } from 'react';
import { Input, Menu, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import '../css/Navbar.css';
import logo from '../assets/logo.png';

class Navbar extends Component {
  state = { activeItem: 'timeline' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });

    this.props.history.push(`/${name}`);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu
        id='navbar'
        pointing
        className='fixed'
        color='teal'
        inverted
        size='huge'
      >
        <Menu.Menu>
          <Image src={logo} avatar />
        </Menu.Menu>

        {this.props.currentUser ? (
          <Menu.Menu>
            <Menu.Item
              name='timeline'
              active={this.props.location.pathname === '/timeline'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='memories'
              active={this.props.location.pathname === '/memories'}
              onClick={this.handleItemClick}
            />
            <Menu.Item name='new-memory' onClick={this.handleItemClick} />
          </Menu.Menu>
        ) : null}

        {this.props.currentUser ? (
          <Menu.Menu position='right'>
            <Menu.Item>
              Logged in as: {this.props.currentUser.username}
            </Menu.Item>
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
        ) : (
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              onClick={() => this.props.history.push('/')}
            />
            <Menu.Item
              name='sign-up'
              active={activeItem === 'sign-up'}
              onClick={() => this.props.history.push('/')}
            />
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

export default withRouter(Navbar);
