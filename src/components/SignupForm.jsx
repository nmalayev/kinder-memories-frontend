import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

const relationOptions = [
  { key: 'parent', text: 'Parent', value: 'parent' },
  { key: 'grandparent', text: 'Grandparent', value: 'grandparent' },
  { key: 'sibling', text: 'Grandparent', value: 'sibling' },
  { key: 'friend', text: 'Friend', value: 'friend' },
  { key: 'cousin', text: 'Cousin', value: 'cousin' },
  { key: 'uncle', text: 'Uncle', value: 'uncle' },
  { key: 'aunt', text: 'Aunt', value: 'aunt' }
];

class SignupForm extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    passwordConfirm: '',
    relation: ''
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name, username, password, relation } = this.state;

    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        password: password,
        username: username,
        relation: relation
      })
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
    const { name, username, password, passwordConfirm, relation } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit} id='signup-form'>
          <Form.Input
            label='Name'
            type='text'
            placeholder='Name'
            name='name'
            onChange={this.handleChange}
            value={name}
            transparent
          />
          <Form.Input
            label='Username'
            type='text'
            placeholder='Username'
            name='username'
            onChange={this.handleChange}
            value={username}
            transparent
          />
          <Form.Input
            label='Password'
            type='password'
            placeholder='Password'
            name='password'
            onChange={this.handleChange}
            value={password}
            transparent
          />
          <Form.Input
            label='Confirm Password'
            type='password'
            placeholder='Confirm Password'
            name='passwordConfirm'
            onChange={this.handleChange}
            value={passwordConfirm}
            transparent
          />
          <Form.Select
            label='Relation'
            placeholder='Confirm Password'
            name='relation'
            options={relationOptions}
            onChange={this.handleChange}
            value={relation}
          />
          <Button
            type='submit'
            icon='signup'
            inverted
            basic
            color='grey'
            content={
              password === passwordConfirm ? 'Sign up' : "Passwords don't match"
            }
            disabled={password === passwordConfirm && password ? false : true}
          />
        </Form>
      </div>
    );
  }
}

export default SignupForm;
