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

  const handleTest = e => {
    e.preventDefault();

    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({textback: e.target.value})
    }

    fetch(`${process.env.REACT_APP_PROXY_URI}/test`, options)
      .then(res => res.json)
      .then(payload => console.log('payload: ', payload))
      .catch(err => console.log('err: ', err));
  }

  return (
    <div className="App">
      <h5>Github Repository Manager</h5>

      <form onSubmit={handleTest}>
        <input type="text" name="textback" id="textback" />
        <button type="submit">Send</button>
      </form>

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
