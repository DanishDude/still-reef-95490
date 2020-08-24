export const startFetchRepoDetails = () => ({
  type: 'START_FETCH_REPO_DETAILS'
});

export const errorFetchRepoDetails = err => ({
  type: 'ERROR_FETCH_REPO_DETAILS',
  err
});

export const successFetchContributors = contributors => ({
  type: 'SUCCESS_FETCH_CONTRIBUTORS',
  contributors
});

export const fetchContributors = contributorsUrl => dispatch => {
  dispatch(startFetchRepoDetails());

  fetch(contributorsUrl)
    .then(res => res.json())
    .then(payload => dispatch(successFetchContributors(payload)))
    .catch(err => dispatch(errorFetchRepoDetails(err)));
};

export const successFetchBranches = branches => ({
  type: 'SUCCESS_FETCH_BRANCHES',
  branches
});

export const fetchBranches = branchesUrl => dispatch => {
  dispatch(startFetchRepoDetails());

  fetch(branchesUrl)
    .then(res => res.json())
    .then(payload => dispatch(successFetchBranches(payload)))
    .catch(err => dispatch(errorFetchRepoDetails(err)));
};

export const successFetchLanguages = languages => ({
  type: 'SUCCESS_FETCH_LANGUAGES',
  languages
});

export const fetchLanguages = languagesUrl => dispatch => {
  dispatch(startFetchRepoDetails());

  fetch(languagesUrl)
    .then(res => res.json())
    .then(payload => dispatch(successFetchLanguages(payload)))
    .catch(err => dispatch(errorFetchRepoDetails(err)));
};
