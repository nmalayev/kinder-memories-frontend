// import React, { Component } from 'react';
// import {
//   Button,
//   Header,
//   Icon,
//   Image,
//   Menu,
//   Segment,
//   Sidebar
// } from 'semantic-ui-react';

// import '../css/SideBar.css';

// export default class SideBar extends Component {
//   state = { visible: false };

//   handleHideClick = () => this.setState({ visible: false });
//   handleShowClick = () => this.setState({ visible: true });
//   handleSidebarHide = () => this.setState({ visible: false });

//   render() {
//     const { visible } = this.state;

//     return (
//       <div id='sidebar'>
//         <Button.Group>
//           <Button disabled={visible} onClick={this.handleShowClick}>
//             Show sidebar
//           </Button>
//           <Button disabled={!visible} onClick={this.handleHideClick}>
//             Hide sidebar
//           </Button>
//         </Button.Group>
//         <Sidebar
//           as={Menu}
//           animation='overlay'
//           icon='labeled'
//           inverted
//           onHide={this.handleSidebarHide}
//           vertical
//           visible={visible}
//           width='thin'
//         >
//           <Menu.Item as='a'>
//             <Icon name='home' />
//             Home
//           </Menu.Item>
//           <Menu.Item as='a'>
//             <Icon name='gamepad' />
//             Games
//           </Menu.Item>
//           <Menu.Item as='a'>
//             <Icon name='camera' />
//             Channels
//           </Menu.Item>
//         </Sidebar>
//       </div>
//     );
//   }
// }

import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import '../css/SideBar.css';

const friendOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' }
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 'Elliot Fu',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' }
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 'Stevie Feliciano',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' }
  },
  {
    key: 'Christian',
    text: 'Christian',
    value: 'Christian',
    image: { avatar: true, src: '/images/avatar/small/christian.jpg' }
  }
];

export default class MenuExampleVerticalText extends Component {
  state = { activeItem: 'closest' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu text vertical id='sort-menu'>
          <Menu.Item header>Sort By</Menu.Item>
          <Menu.Item
            name='closest'
            active={activeItem === 'closest'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='mostComments'
            active={activeItem === 'mostComments'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='mostPopular'
            active={activeItem === 'mostPopular'}
            onClick={this.handleItemClick}
          />
        </Menu>
        <span>
          Show me posts by{' '}
          <Dropdown
            inline
            options={friendOptions}
            defaultValue={friendOptions[0].value}
          />
        </span>
      </div>
    );
  }
}
