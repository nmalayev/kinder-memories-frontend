import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    }) // end of fetch
      .then(r => r.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors);
        } else {
          this.props.setCurrentUser(response);
          this.props.history.push('/timeline');
        }
      });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit} id='login-form'>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Username'
            type='text'
            placeholder='Username'
            name='username'
            onChange={this.handleChange}
            value={username}
            transparent
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            placeholder='Password'
            name='password'
            onChange={this.handleChange}
            value={password}
            transparent
          />
          <Button
            type='submit'
            content='Login'
            icon='check'
            inverted
            basic
            color='grey'
            disabled={username && password ? false : true}
          />
        </Form>
      </div>
    );
  }
}

export default LoginForm;
