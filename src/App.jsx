import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ConnectUser from './components/ConnectUser';
import RepoResults from './components/RepoResults';
import RepoSearch from './components/RepoSearch';
import UserRepos from './components/UserRepos';
import './App.scss';
import './Container.scss';

function App() {
  const { isLoggedIn } = useSelector(state => state.user);
  const [textback, setTextback] = useState('');

  const getNemo = e => {
    e.preventDefault();

    const options = {
      headerts: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    
    fetch(`${process.env.REACT_APP_PROXY_URI}/`, options)
      .then(res => res.json())
      .then(payload => {
        console.log('PAYLOAD ', payload);
        setTextback(payload.Title);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <h5>Github Repository Manager</h5>
      <button onClick={e => getNemo(e)}>Get Nemo</button>
      <p>{textback}</p>

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
