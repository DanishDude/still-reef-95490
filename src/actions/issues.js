export const startSubmitIssue = () => ({
  type: 'START_SUBMIT_ISSUE'
});

export const errorSubmitIssue = err => ({
  type: 'ERROR_SUBMIT_ISSUE',
  err
});

export const successSubmitIssue = payload => ({
  type: 'SUCCESS_SUBMIT_ISSUE',
  payload
});

export const fetchCreateIssue = (token, issue, owner, repo) => dispatch => {
  dispatch(startSubmitIssue());

  const options = {
    method: 'POST',
    headers: { 
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'token ' + token,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(issue)
  };

  fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, options)
    .then(res => res.json())
    .then(payload => {
      if (payload.message === 'Not Found') {
        dispatch(errorSubmitIssue(payload));
      } else {
        dispatch(successSubmitIssue(payload));
      }
    })
    .catch(err => dispatch(errorSubmitIssue(err)));
};

export const clearIssue = () => ({
  type: 'CLEAR_ISSUE'
});
