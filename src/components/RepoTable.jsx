import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, fetchContributors, fetchLanguages } from '../actions/repoDetail';
import CreateIssue from './CreateIssue';
import LoginPrompt from './LoginPrompt';
import RepoDetails from './RepoDetails';
import './RepoTable.scss';

const RepoTable = props => {
  const { options, repos } = props;
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.user);
  const [repoDetailsModalShow, setRepoDetailsModalShow] = useState(false);
  const [issuesModalShow, setIssuesModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [repo, setRepo] = useState({});

  const getRepoDetails = repo => {
    setRepo(repo);
    dispatch(fetchBranches(repo.branches_url.replace('{/branch}', '')));
    dispatch(fetchContributors(repo.contributors_url));
    dispatch(fetchLanguages(repo.languages_url));
    setRepoDetailsModalShow(true);
  };

  const submitIssue = repo => {
    if (isLoggedIn) {
      setRepo(repo);
      setIssuesModalShow(true);
    } else {
      setLoginModalShow(true);
    }
  };

  return (
    <div className="RepoTable">
      <div>
        <Table striped bordered hover size="sm" responsive>

          <thead>
            <tr>
              {options && options.showAvatar ? <th></th> : ''}
              <th>Name</th>
              <th>Owner</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {repos.map(repo => 
              <tr key={repo.id} className="repo">
                {options && options.showAvatar ? 
                  <td>
                    <img className="avatar" src={repo.owner.avatar_url} alt=''/>
                  </td> : undefined}
                <td>{repo.name}</td>
                <td>{repo.owner.login}</td>
                <td>
                  <Button variant="info" onClick={() => getRepoDetails(repo)} >
                    Details
                  </Button>
                  {repo.has_issues
                    ? <Button variant="dark" onClick={() => submitIssue(repo)} >
                      Submit an Issue
                    </Button> : ''}
                </td>
                <td>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel="noopener noreferrer"
                  >
                    See on github
                  </a>
                </td>
              </tr>
            )}
          </tbody>

        </Table>
      </div>
      
      <RepoDetails
        show={repoDetailsModalShow}
        onHide={() => setRepoDetailsModalShow(false)}
        reponame={repo.name}
      />
      <CreateIssue
        show={issuesModalShow}
        onHide={() => setIssuesModalShow(false)}
        repo={repo}
      />
      <LoginPrompt
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
        prompt='Create an Issue'
      />
    </div>
  )
}

export default RepoTable;
