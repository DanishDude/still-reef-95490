import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const LoginPrompt = props => {
  const { onHide, prompt } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="RepoDetails"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please login with Github to {prompt}
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginPrompt;
