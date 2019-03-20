import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export class Login extends Component {
  render() {
    return (
      <div className='main-body'>
        <Form>
          <Form.Input
            label='Username'
            type='text'
            placeholder='Username'
            name='username'
          />
          <Form.Input
            label='Password'
            type='password'
            placeholder='Password'
            name='password'
            onChange=''
          />
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
