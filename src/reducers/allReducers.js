import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import issues from './issues';
import repoDetail from './repoDetail';
import repoSearch from './repoSearch';
import user from './user';

export const allReducers = combineReducers({
  form: formReducer,
  issues,
  repoDetail,
  repoSearch,
  user
});

export default allReducers;
