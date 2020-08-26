export const startLogin = () => ({
  type: 'START_LOGIN'
});

export const errorLogin = error => ({
  type: 'ERROR_LOGIN',
  error
});

export const successLogin = user => ({
  type: 'SUCCESS_LOGIN',
  user
});

export const userLogin = code => dispatch => {
  dispatch(startLogin());

  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET;
  const proxy_uri = process.env.REACT_APP_PROXY_URI;

  const requestData = { client_id, redirect_uri, client_secret, code };

  const options = {
    method: 'POST',
    body: JSON.stringify(requestData)
  };

  fetch(`${proxy_uri}/api/oauth`, options)
    .then(res => res.json())
    .then(user =>  dispatch(successLogin(user)))
    .catch(err => dispatch(errorLogin(err)));
};

export const startFetchUserRepos = () => ({
  type: 'START_FETCH_USER_REPOS'
});

export const errorFetchUserRepos = err => ({
  type: 'ERROR_FETCH_USER_REPOS',
  err
});

export const successFetchUserRepos = userRepos => ({
  type: 'SUCCESS_FETCH_USER_REPOS',
  userRepos
});

export const fetchUserRepos = repos_url => dispatch => {
  dispatch(startFetchUserRepos());

  fetch(repos_url)
    .then(res => res.json())
    .then(userRepos => dispatch(successFetchUserRepos(userRepos)))
    .catch(err => dispatch(errorFetchUserRepos(err)));
};
