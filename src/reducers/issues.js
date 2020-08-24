const initialState = {
  loading: false,
  issue: {},
  error: ''
};

const repoDetail = (state = initialState, action) => {
  switch(action.type) {
    case 'START_SUBMIT_ISSUE':
      return { ...state, loading: true, };
    case 'SUCCESS_SUBMIT_ISSUE':
      return { ...state, issue: action.payload, success: true, loading: false };
    case 'ERROR_SUBMIT_ISSUE':
      return { ...state, error: action.err, success: false, loading: false };
    case 'CLEAR_ISSUE':
      return initialState;
    default:
      return state;
  };
};

export default repoDetail;
