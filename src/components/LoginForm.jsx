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
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label='Username'
            type='text'
            placeholder='Username'
            name='username'
            onChange={this.handleChange}
            value={username}
          />
          <Form.Input
            fluid
            label='Password'
            type='password'
            placeholder='Password'
            name='password'
            onChange={this.handleChange}
            value={password}
          />
          <Button
            type='submit'
            content='Login'
            disabled={username && password ? false : true}
          />
        </Form>
      </div>
    );
  }
}

export default LoginForm;
