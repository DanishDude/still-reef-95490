const initialState = {
  loading: false,
  branches: [],
  contributors: [],
  languages: [],
  error: ''
};

const repoDetail = (state = initialState, action) => {
  switch(action.type) {
    case 'START_FETCH_REPO_DATA':
      return { ...state, loading: true, };
    case 'SUCCESS_FETCH_BRANCHES':
      return { ...state, branches: action.branches, loading: false };
    case 'SUCCESS_FETCH_CONTRIBUTORS':
      return { ...state, contributors: action.contributors, loading: false };
    case 'SUCCESS_FETCH_LANGUAGES':
      return { ...state, languages: Object.keys(action.languages), loading: false };
    case 'ERROR_FETCH_REPO_DATA':
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  };
};

export default repoDetail;
