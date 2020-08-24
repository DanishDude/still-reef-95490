export const startRepoSearch = () => ({
  type: 'START_REPO_SEARCH'
});

export const successRepoSearch = repos => ({
  type: 'SUCCESS_REPO_SEARCH',
  repos
});

export const rateLimitExceeded = () => ({
  type: 'RATE_LIMIT_EXCEEDED'
});

export const errorRepoSearch = err => ({
  type: 'ERROR_REPO_SEARCH',
  err
});

export const fetchRepoSearch = (token, search) => dispatch => {
  dispatch(startRepoSearch());

  const options = {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      Authorization: token ? 'token ' + token : '',
      'Content-type': 'application/json'
    }
  }

  fetch(`https://api.github.com/search/repositories?q=${search}`, options)
    .then(res => res.json())
    .then(payload => {
      if (payload.message && payload.message.startsWith('API rate limit exceeded')) {
        dispatch(rateLimitExceeded());
      } else {
        dispatch(successRepoSearch(payload))
      }
    })
    .catch(err => dispatch(errorRepoSearch(err)));
};
