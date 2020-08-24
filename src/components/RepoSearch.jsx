import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchRepoSearch } from '../actions/repoSearch';
import LoginPrompt from './LoginPrompt';
import './RepoSearch.scss';

let RepoSearch = () => {
  const { limitExceeded } = useSelector(state => state.repoSearch);
  const { token } = useSelector(state => state.user.user);
  const [onChangeAllowed, setOnChangeAllowed] = useState(true);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (limitExceeded) {
      setOnChangeAllowed(false);
      setLoginModalShow(true);
    };
  }, [limitExceeded]);

  const handleSubmit = (event) => {
    if (!onChangeAllowed) return;

    if (event.target.value.length >= 2) {
      dispatch(fetchRepoSearch(token, event.target.value));
    };
  };

  return (
    <div className="RepoSearch">
      <h6>Search for repositories on Github</h6>

      <form >
        <Field
          name="search"
          component="input"
          type="text"
          required
          onChange={onChangeAllowed ? (event) => handleSubmit(event) : ''}
        />
      </form>

      <LoginPrompt
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
        prompt='increase your search rate limit.'
      />
    </div>
  );
};

RepoSearch = reduxForm({ form: 'repoSearch' })(RepoSearch);

export default RepoSearch;