import React, { Component } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';

import backgroundVideo from '../assets/baby_stock_video.mp4';
import logo from '../assets/logo.png';
import '../css/HomePage.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class HomePage extends Component {
  state = {
    renderSignupForm: false
  };

  handleClickToRenderSignupForm = () => {
    this.setState({
      renderSignupForm: !this.state.renderSignupForm
    });
  };
  render() {
    return (
      <div className='homepage'>
        <img src={logo} />
        <Segment placeholder compact id='login-homepage'>
          <Grid relaxed='very' stackable>
            {!this.state.renderSignupForm ? (
              <Grid.Column>
                <LoginForm
                  history={this.props.history}
                  setCurrentUser={this.props.setCurrentUser}
                />
                <Button
                  id='signup-btn'
                  content='Sign up'
                  icon='signup'
                  size='small'
                  inverted
                  color='grey'
                  basic
                  onClick={this.handleClickToRenderSignupForm}
                />{' '}
              </Grid.Column>
            ) : (
              <Grid.Column>
                <SignupForm
                  history={this.props.history}
                  setCurrentUser={this.props.setCurrentUser}
                />
                <Button
                  id='login-btn'
                  content='I have an account'
                  size='small'
                  inverted
                  color='grey'
                  basic
                  onClick={this.handleClickToRenderSignupForm}
                />
              </Grid.Column>
            )}
          </Grid>
        </Segment>
        <div className='vidcontainer'>
          <video loop autoPlay muted>
            <source src={backgroundVideo} type='video/mp4' />
            <source src={backgroundVideo} type='video/ogg' />
          </video>
        </div>
        <div className='credit'>
          <p>
            Stock footage provided by Videvo, downloaded from www.videvo.net
          </p>
        </div>
      </div>
    );
  }
}

export default HomePage;
