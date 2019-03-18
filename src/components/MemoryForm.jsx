import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';
import '../css/MemoryForm.css';

const options = [
  { key: 'photo', text: 'Photo', value: 'photo' },
  { key: 'video', text: 'Video', value: 'video' },
  { key: 'letter', text: 'Letter', value: 'letter' }
];

// Impory cloudinary code form script in index.html
const cloudinary = window.cloudinary;
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'dfotztxvl',
    uploadPreset: 'vifbs3aj'
  },
  (error, result) => {
    console.log(error, result);
  }
);

class MemoryForm extends Component {
  state = { newMemType: '', newMemDescription: '' };

  handleChange = (e, { value }) => {
    this.setState({ [e.target.name]: value }, () => console.log(this.state));
  };

  render() {
    console.log(cloudinary);
    const { value } = this.state;
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
              <Form.Group widths='equal'>
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
                  onChange={this.props.handleChange}
                />

                <Button
                  id='upload_widget'
                  className='cloudinary-button'
                  onClick={() => myWidget.open()}
                >
                  Upload
                </Button>
              </Form.Group>
              <Form.Button>Submit</Form.Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MemoryForm;
