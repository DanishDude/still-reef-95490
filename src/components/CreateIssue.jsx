import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { clearIssue, fetchCreateIssue } from '../actions/issues';
import './CreateIssue.scss';

let CreateIssue = props => {
  const { onHide, repo } = props;
  const dispatch = useDispatch();
  const { issues } = useSelector(state => state.form);
  const { token } = useSelector(state => state.user.user);
  const { loading, issue, error, success } = useSelector(state => state.issues);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(fetchCreateIssue(token, issues.values, repo.owner.login, repo.name));
  };

  const clearIssueData = () => {
    onHide();
    dispatch(clearIssue());
    dispatch(reset('issues'))
  };

  return (
    <div className="CreateIssue">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="RepoDetails"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create an Issue for "{repo.name}"
          </Modal.Title>
        </Modal.Header>
        
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="field">
              <Field
              name="title"
              component="input"
              type="text"
              placeholder="Title"
              required
            />
          </div>

          <div className="field">
            <Field
              name="body"
              component="input"
              type="textarea"
              placeholder="Write a description"
            />
          </div>

          <Button
            type="submit"
            disabled={issues && issues.values && issues.values.title.length <= 0}>
              Submit
          </Button>
        </form>

        <div>
          {loading ? <p>Sending...</p> : ''}
          {success && issue.url
            ? <p>Issue #{issue.number} created successfully - 
                <a
                  href={issue.html_url}
                  target='_blank'
                  rel="noopener noreferrer"
                  >
                  view on Github
                </a>
              </p>
              : success === false
                ? <p>Error creating issue: {error}</p> : ''}
        </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={clearIssueData}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

CreateIssue = reduxForm({ form: 'issues' })(CreateIssue);

export default CreateIssue;
