import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';
import '../css/MemoryForm.css';

const options = [
  { key: 'ph', text: 'Photo', value: 'photo' },
  { key: 'v', text: 'Video', value: 'video' },
  { key: 'l', text: 'Letter', value: 'letter' }
];

class MemoryForm extends Component {
  state = { isOpen: false };

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <Modal open={this.props.showAddModal}>
        <Modal.Header>New Memory</Modal.Header>
        <Modal.Content image>
          {/* <Image
            wrapped
            size='medium'
            src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
          /> */}
          <Modal.Description>
            <Header>Add New Memory</Header>
            <Form onSubmit={e => this.props.handleSubmit(e)}>
              {/* <Form onSubmit={e => this.handleSubmit(e)}> */}
              <Form.Group widths='equal'>
                <Form.Input fluid label='Title' placeholder='Title' />
                <Form.TextArea
                  fluid
                  label='Description'
                  placeholder={`Tell us more about your memory of ${
                    this.props.childName
                  }...`}
                />
                <Form.Select
                  fluid
                  label='Memory Type'
                  options={options}
                  placeholder='Type'
                />
                <Form.Input label='Date of Memory' type='date' />
              </Form.Group>
              {/* <Form.Group inline>
                <label>Size</label>
                <Form.Radio
                  label='Video'
                  value='sm'
                  checked={value === 'sm'}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Letter'
                  value='md'
                  checked={value === 'md'}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Large'
                  value='lg'
                  checked={value === 'lg'}
                  onChange={this.handleChange}
                /> 
              </Form.Group> */}

              {/* <Form.Checkbox label='I agree to the Terms and Conditions' /> */}
              <Form.Button>Submit</Form.Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MemoryForm;
