import React from 'react';
import { useSelector } from 'react-redux';
import ConnectUser from './components/ConnectUser';
import RepoResults from './components/RepoResults';
import RepoSearch from './components/RepoSearch';
import UserRepos from './components/UserRepos';
import './App.scss';
import './Container.scss';

function App() {
  const { isLoggedIn } = useSelector(state => state.user);

  const getNemo = e => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_PROXY_URI}/nemo`)
      .then(res => res.json())
      .then(payload => console.log(payload))
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <h5>Github Repository Manager</h5>

      <button onClick={e => getNemo(e)}>Get Nemo</button> 

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
