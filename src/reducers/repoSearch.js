const initialState = {
  loading: false,
  repos: {},
  error: '',
  limitExceeded: false
};

const repoSearch = (state = initialState, action) => {
  switch(action.type) {
    case 'START_REPO_SEARCH':
      return { ...state, loading: true, };
    case 'SUCCESS_REPO_SEARCH':
      return { ...state, repos: action.repos, loading: false };
    case 'RATE_LIMIT_EXCEEDED':
      return { ...state, limitExceeded: true, loading: false };
    case 'ERROR_REPO_SEARCH':
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  };
};

export default repoSearch;