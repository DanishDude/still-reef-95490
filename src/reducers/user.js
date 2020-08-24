const initialState = {
  userRepos: [],
  loading: false,
  user: {},
  isLoggedIn: false,
  error: ''
};

const user = (state = initialState, action) => {
  switch(action.type) {
    case 'START_LOGIN':
      return { ...state, loading: true, };
    case 'SUCCESS_LOGIN':
      return { ...state, user: action.user, loading: false, isLoggedIn: true };
    case 'ERROR_LOGIN':
      return { ...state, error: 'Login failed!', loading: false, isLoggedIn: false };
    case 'START_FETCH_USER_REPOS':
      return { ...state, loading: true, };
    case 'SUCCESS_FETCH_USER_REPOS':
      return { ...state, userRepos: action.userRepos, loading: false };
    case 'ERROR_FETCH_USER_REPOS':
      return { ...state, error: { msg: 'Error loading repos!', err: action.err }, loading: false };
    default:
      return state;
  };
};

export default user;
