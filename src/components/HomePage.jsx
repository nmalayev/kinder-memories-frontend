import React from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';

import backgroundVideo from '../baby_stock_video.mp4';
import '../css/HomePage.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function HomePage(props) {
  return (
    <div className='homepage'>
      <Segment placeholder compact id='login-homepage'>
        <Grid relaxed='very' stackable>
          <Grid.Column>
            <LoginForm
              history={props.history}
              setCurrentUser={props.setCurrentUser}
            />
            <Button
              id='signup-btn'
              content='Sign up'
              icon='signup'
              size='small'
              inverted
              color='grey'
              basic
            />
          </Grid.Column>
        </Grid>
      </Segment>
      <div className='vidcontainer'>
        <video loop autoPlay muted>
          <source src={backgroundVideo} type='video/mp4' />
          <source src={backgroundVideo} type='video/ogg' />
        </video>
      </div>
      <div className='credit'>
        <p>Stock footage provided by Videvo, downloaded from www.videvo.net</p>
      </div>
    </div>
  );
}

export default HomePage;
