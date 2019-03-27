import React, { Component } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
import '../css/MemoryForm.css';

const options = [
  { key: 'photo', text: 'Photo', value: 'photo' },
  { key: 'video', text: 'Video', value: 'video' },
  { key: 'letter', text: 'Letter', value: 'letter' }
];

class MemoryForm extends Component {
  // formCompleted = () => {
  //   const {
  //     newMemTitle,
  //     newMemDescription,
  //     newMemType,
  //     newMemDate,
  //     newMemLetter
  //   } = this.props;

  //   if (
  //     (newMemTitle && newMemDescription && newMemType && newMemDate) ||
  //     (newMemTitle &&
  //       newMemDescription &&
  //       newMemType &&
  //       newMemDate &&
  //       newMemLetter)
  //   ) {
  //     return true;
  //   } else {
  //     false;
  //   }
  // };

  render() {
    return (
      <Modal open={this.props.showAddModal}>
        <Modal.Header>New Memory</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Add New Memory</Header>
            <Button onClick={() => this.props.history.push('google.com')}>
              Go Back
            </Button>

            <Form onSubmit={this.props.handleSubmit} id='new-memory-form'>
              {/* <Form.Group widths='equal'> */}
              <Form.Select
                fluid
                selection
                label='Memory Type'
                color='black'
                name='newMemType'
                options={options}
                placeholder='Type'
                onChange={this.props.handleSelectChange}
                value={this.props.newMemType}
                required
              />
              <Form.Input
                label='Date of Memory'
                type='date'
                name='newMemDate'
                min='2018-04-13'
                onChange={this.props.handleChange}
                required
              />
              <Form.Input
                fluid
                label='Title'
                placeholder='Title'
                name='newMemTitle'
                onChange={this.props.handleChange}
                required
              />
              <Form.TextArea
                label='Description'
                placeholder={`Tell us more about your memory of ${
                  this.props.childName
                }...`}
                name='newMemDescription'
                onChange={this.props.handleChange}
                required
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
                  required
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
                  required
                />
              ) : null}
              {/* </Form.Group> */}
              <Form.Group>
                <Form.Button>Submit</Form.Button>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MemoryForm;
