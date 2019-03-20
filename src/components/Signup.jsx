import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export class Login extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Input label='Name' type='text' placeholder='Name' name='name' />
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
          <Form.Input
            label='Confirm Password'
            type='password'
            placeholder='Confirm Password'
            name='confirm-password'
            onChange=''
          />
          <Button type='submit'>Sign Up</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
