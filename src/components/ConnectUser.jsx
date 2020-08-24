import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../actions/user';
import './ConnectUser.scss';

const ConnectUser = () => {
  const dispatch = useDispatch();
  const { avatar_url, login } = useSelector(state => state.user.user);
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

  useEffect(() => {
    const uri = window.location.href;
    const hasCode = uri.includes("?code=");

    if (hasCode) {
      const newUri = uri.split("?code=");
      window.history.pushState({}, null, newUri[0]);
      dispatch(userLogin(newUri[1]))
    }
  }, [dispatch]);

  return (
    <div className="ConnectUser">
      <h6>Manage your Github repositories</h6>
      {login
        ? <div className="user-info">
            <img src={avatar_url} alt="" />
            <h6>Welcome {login}!</h6>
          </div>
        : <a href={`https://github.com/login/oauth/authorize?scope=repo,user
            &client_id=${client_id}&redirect_uri=${redirect_uri}`}
          >
            Login with Github
          </a>}
    </div>
  );
};

export default ConnectUser;
