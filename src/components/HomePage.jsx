import React from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';

import backgroundVideo from '../baby_stock_video.mp4';
import '../css/HomePage.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function HomePage() {
  return (
    <div className='homepage'>
      {/* <Segment placeholder id='login-homepage'>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
              />

              <Button content='Login' primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='big' />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment> */}
      <LoginForm />
      <SignupForm />
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
