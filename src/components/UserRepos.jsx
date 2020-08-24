import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { fetchUserRepos } from '../actions/user';
import RepoTable from './RepoTable';
import './UserRepos.scss';

const UserRepos = () => {
  const { error, loading, userRepos } = useSelector(state => state.user);
  const { repos_url } = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const getUserRepos = () => dispatch(fetchUserRepos(repos_url));

  return (
    <div className="UserRepos">
      <Button type="button" onClick={getUserRepos}>Get My Repos</Button>
      {userRepos && userRepos.length > 0 
        ? 
        <div>
          <h6>My Repositories:</h6>
          {<RepoTable repos={userRepos} />}
        </div>
        : ''}
      {loading ? <p>Loading...</p> : ''}
      {error ? <p>Error loading repos !</p> : ''}
    </div>
  );
};

export default UserRepos;
