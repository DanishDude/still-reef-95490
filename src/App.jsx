import React from 'react';
import { useSelector } from 'react-redux';
import ConnectUser from './components/ConnectUser';
import RepoResults from './components/RepoResults';
import RepoSearch from './components/RepoSearch';
import UserRepos from './components/UserRepos';
import './App.scss';
import './Container.scss';

function App() {
  const { isLoggedIn } = useSelector(state => state.user)
  console.log(process.env.REACT_APP_REDIRECT_URI);

  return (
    <div className="App">
      <h5>Github Repository Manager</h5>

      <div className="container">
        <ConnectUser />
        {isLoggedIn ? <UserRepos /> : ''}
      </div>

      <div className="container">
        <RepoSearch />
        <RepoResults />
      </div>

    </div>
  );
};

export default App;
