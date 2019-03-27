import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';
import '../css/MemoryForm.css';

const options = [
  { key: 'photo', text: 'Photo', value: 'photo' },
  { key: 'video', text: 'Video', value: 'video' },
  { key: 'letter', text: 'Letter', value: 'letter' }
];

class MemoryForm extends Component {
  render() {
    return (
      <Modal open={this.props.showAddModal}>
        <Modal.Header>New Memory</Modal.Header>
        <Button onClick={() => this.props.history.goBack()}>Go Back</Button>

        <Modal.Content image>
          {/* <Image
            wrapped
            size='medium'
            src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
          /> */}
          <Modal.Description>
            <Header>Add New Memory</Header>

            <Form onSubmit={this.props.handleSubmit}>
              {/* <Form.Group widths='equal'> */}
              <Form.Select
                fluid
                selection
                label='Memory Type'
                name='newMemType'
                options={options}
                placeholder='Type'
                onChange={this.props.handleSelectChange}
                value={this.props.newMemType}
              />
              <Form.Input
                label='Date of Memory'
                type='date'
                name='newMemDate'
                min='2018-04-13'
                onChange={this.props.handleChange}
              />
              <Form.Input
                fluid
                label='Title'
                placeholder='Title'
                name='newMemTitle'
                onChange={this.props.handleChange}
              />
              <Form.TextArea
                label='Description'
                placeholder={`Tell us more about your memory of ${
                  this.props.childName
                }...`}
                name='newMemDescription'
                onChange={this.props.handleChange}
              />

              {this.props.newMemType === 'photo' ||
              this.props.newMemType === 'video' ? (
                <Form.Input
                  label={`Attach ${this.props.newMemType}`}
                  type='file'
                  name='file'
                  accept={
                    this.props.newMemType === 'photo' ? 'image/*' : 'video/*'
                  }
                />
              ) : null}
              {this.props.newMemType === 'letter' ? (
                <Form.TextArea
                  label='Letter (max 500 characters)'
                  placeholder={`Write a note for ${this.props.childName}...`}
                  name='newMemLetter'
                  maxlength='500'
                  onChange={this.props.handleChange}
                  id='newMemLetter'
                />
              ) : null}
              {/* </Form.Group> */}
              <Form.Button>Submit</Form.Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MemoryForm;
