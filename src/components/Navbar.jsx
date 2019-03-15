// import React from 'react';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { NavLink } from 'react-router-dom';

// function Navbar() {
//   const responseGoogle = response => {
//     console.log(response);
//   };
//   return (
//     <div className='Navbar'>
//       <GoogleLogin
//         clientId='797274764544-8k4ne4k38ulf5elhdbg19ojti4ee1vra.apps.googleusercontent.com'
//         buttonText='Login'
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//       />

//       <GoogleLogout buttonText='Logout' onLogoutSuccess={responseGoogle} />
//       <NavLink to='/new-memory' activeClassName='active'>
//         New Memory
//       </NavLink>
//       <NavLink to='/memories' activeClassName='active'>
//         All Memories
//       </NavLink>
//       <NavLink to='/timeline' activeClassName='active'>
//         Timeline
//       </NavLink>

//       <input />
//     </div>
//   );
// }

// export default Navbar;

import React, { Component } from 'react';
import { Input, Menu, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
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
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
