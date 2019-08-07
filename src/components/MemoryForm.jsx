import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import '../css/MemoryForm.css';

const options = [
  { key: 'photo', text: 'Photo', value: 'photo' },
  { key: 'video', text: 'Video', value: 'video' },
  { key: 'letter', text: 'Letter', value: 'letter' }
];

function MemoryForm(props) {
  const {
    newMemTitle,
    newMemDescription,
    newMemType,
    newMemDate,
    newMemLetter,
    newMemFile,
    handleChange,
    showAddModal,
    handleSubmit,
    handleSelectChange,
    handleFileUpload,
    childName
  } = props;

  // Function checks if all input fields are filled in order to enable Submit button.
  const formCompleted = () => {
    if (
      newMemType === 'letter' &&
      newMemTitle &&
      newMemDescription &&
      newMemType &&
      newMemDate &&
      newMemLetter
    ) {
      return true;
    } else if (
      newMemType !== 'letter' &&
      newMemTitle &&
      newMemDescription &&
      newMemType &&
      newMemDate &&
      newMemFile
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Modal open={showAddModal} size='tiny' id='modal-form'>
      <Modal.Header id='modal-header'>Add New Memory</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit} id='new-memory-form'>
          <Form.Select
            fluid
            selection
            label='Memory Type'
            color='black'
            name='newMemType'
            options={options}
            placeholder='Type'
            onChange={handleSelectChange}
            value={newMemType}
            required
          />
          <Form.Input
            label='Date of Memory'
            type='date'
            name='newMemDate'
            min='2018-04-13'
            max='2050-04-13'
            onChange={handleChange}
            value={newMemDate}
            required
          />
          <Form.Input
            fluid
            label='Title'
            placeholder='Title'
            name='newMemTitle'
            onChange={handleChange}
            value={newMemTitle}
            required
          />
          <Form.TextArea
            label='Description'
            placeholder={`Tell us more about your memory of ${childName}...`}
            name='newMemDescription'
            onChange={handleChange}
            value={newMemDescription}
            required
          />

          {newMemType === 'photo' || newMemType === 'video' ? (
            <Form.Input
              label={`Attach ${newMemType}`}
              type='file'
              name='file'
              accept={newMemType === 'photo' ? 'image/*' : 'video/*'}
              onChange={handleFileUpload}
              required
            />
          ) : null}
          {newMemType === 'letter' ? (
            <Form.TextArea
              label='Letter (max 500 characters)'
              placeholder={`Write a note for ${childName}...`}
              name='newMemLetter'
              maxLength='500'
              onChange={handleChange}
              id='newMemLetter'
              value={newMemLetter}
              required
            />
          ) : null}
          <div id='new-form-buttons'>
            <Button
              negative
              // to prevent this button from triggering form submit, have to specify type='button'
              // https://stackoverflow.com/questions/932653/how-to-prevent-buttons-from-submitting-forms
              type='button'
              content='Go Back'
              onClick={() => props.history.goBack()}
            />

            <Button
              type='submit'
              content={
                !newMemFile &&
                (newMemType === 'photo' || newMemType === 'video')
                  ? 'Please attach file'
                  : 'Submit'
              }
              positive
              disabled={!formCompleted()}
            />
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default MemoryForm;
