import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import wave from '../../images/form-bg.png';
import bg from '../../images/form.svg';
import avatar from '../../images/avatar.svg';

import './registration.scss';

const Registration = ({ error, isAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    email: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { name, password, email } = inputs;

  // redirect to homepage if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    };
  }, [isAuthenticated, history]);

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
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
    // Attempt to register user
    dispatch(register({ name, password, email }));
  };

  const handleCloseErrorMessage = (event) => {
    dispatch(clearErrors());
  };

  return (
    <div className="registration-container">
      <img className="wave" src={wave} alt="wave"/>
      <div className="registration-background-image">
        <img src={bg} alt="bg"/>
      </div>
      <div className="registration-form-wrapper">
        <form className="registration-form" onSubmit={handleSubmit}>
          <img src={avatar} alt="avatar"/>
          <h2>Register</h2> 
          {errorMsg ? 
            (<div className="errorMessage">
              <span className="errorMessage_close-button" onClick={handleCloseErrorMessage}>&times;</span>
              {errorMsg}
              </div>
            ) : null
          }
          <div className="registration-form_item">
            <label className="registration-form_item_label" htmlFor="name">Name</label>
            <input className="registration-form_item_input" type="text" name="name" value={name} onChange={handleChange} placeholder="name..."/>
          </div>
          <div className="registration-form_item">
            <label className="registration-form_item_label" htmlFor="password">Password</label>
            <input className="registration-form_item_input" type="password" name="password" value={password} onChange={handleChange} placeholder="password..."/>
          </div>
          <div className="registration-form_item">
            <label className="registration-form_item_label" htmlFor="email">Email</label>
            <input className="registration-form_item_input" type="email" name="email" value={email} onChange={handleChange} placeholder="email..."/>
          </div>
          <button className="registration-form_item_button" type="submit">submit</button>
        </form>
      </div> 
    </div>
  )
};

const mapStateToProps = state => ({
  error: state.errorReducer,
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(Registration);
