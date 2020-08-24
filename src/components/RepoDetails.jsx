import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './RepoDetails.scss';

const RepoDetails = props => {
  const { reponame, onHide } = props;
  const { branches, contributors, languages } = useSelector(state => state.repoDetail);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="RepoDetails"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {reponame}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <span className="title">Contributors: </span>
            {contributors.map((contributor, i) => 
              <span key={contributor.id}>
                {i === 0 ? ' ' : ', '}
                <img src={contributor.avatar_url} alt="" />
                  <a
                    href={contributor.html_url}
                    target='_blank'
                    rel="noopener noreferrer"
                  >
                    {contributor.login}
                  </a>
              </span>
            )}
          </p>

          <p>
            <span className="title">Branches: </span>
            {branches.map((branch, i) =>
              <span key={i}>{i === 0 ? ' ' : ', '}{branch.name}</span>
            )}
          </p>

          {languages.length > 0 
            ? <p>
              <span className="title">Languages: </span>
              {languages.map((language, i) =>
                <span key={i}>{i === 0 ? ' ' : ', '}{language}</span>
              )}
            </p>
            : ''}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RepoDetails;
