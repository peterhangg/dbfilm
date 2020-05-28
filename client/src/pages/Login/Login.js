import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import wave from '../../images/wave.png';
import bg from '../../images/bg.svg';
import avatar from '../../images/avatar.svg';

import './login.scss';

const Login = ({ isAuthenticated, error }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { email, password } = inputs;

  // redirect to homepage if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    };
  }, [isAuthenticated, history]);

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setErrorMsg(error.msg.msg);
    } else {
      setErrorMsg("");
    };
  }, [error]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("THIS IS THE FORM STATE ==> ", inputs);
    // Attempt to login user
    dispatch(login({ email, password }));
  };

  const handleCloseErrorMessage = (event) => {
    dispatch(clearErrors());
  };

  return (
    <div className="login-container">
      <img className="wave" src={wave} alt="wave"/>
      <div className="login-background-image">
        <img src={bg} alt="bg"/>
      </div>
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <img src={avatar} alt="avatar"/>
          <h2>Login</h2> 
          {errorMsg ? 
            (<div className="errorMessage">
              <span className="errorMessage_close-button" onClick={handleCloseErrorMessage}>&times;</span>
              {errorMsg}
              </div>
            ) : null
          }
          <div className="login-form_item">
            <label className="login-form_item_label" htmlFor="email">Email</label>
            <input className="login-form_item_input" type="email" name="email" value={email} onChange={handleChange} placeholder="email..."/>
          </div>
          <div className="login-form_item">
            <label className="login-form_item_label" htmlFor="password">Password</label>
            <input className="login-form_item_input" type="password" name="password" value={password} onChange={handleChange} placeholder="password..."/>
          </div>
          <button className="login-form_item_button" type="submit">Login</button>
        </form>
      </div> 
    </div>
  )
};

const mapStateToProps = state => ({
  error: state.errorReducer,
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(Login);
