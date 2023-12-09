import React, { useEffect, useState } from 'react'
import { faInfoCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios'
import { NavLink } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

function Register() {
  const [user, setUser] = useState('')
  const [isUserValid, setUserValid] = useState(false);

  const [pwd, setPwd] = useState('');
  const [isPwdValid, setPwdValid] = useState(false);

  const [pwdRepeat, setPwdRepeat] = useState('');
  const [isPwdRepeatValid, setPwdRepeatValid] = useState(false);

  const [errMsg, setErrMsg] = useState('errMsg');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setUserValid(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setPwdValid(PWD_REGEX.test(pwd));
    setPwdRepeatValid(pwd === pwdRepeat);
  }, [pwd, pwdRepeat])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, pwdRepeat]);

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(REGISTER_URL, {
      username: user,
      password: pwd
    })
      .then(() => {
        setSuccess(true);
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
          setErrMsg('Username Taken');
        } else {
          setErrMsg('Registration Failed');
        }
      })
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Successs!</h1>
          <NavLink to='/login'>Sign In</NavLink>
        </section>
      ) : (
        <section>
          <p className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
          <h1>Register</h1>
          <form onSubmit={e => handleSubmit(e)}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon icon={faCheck} className={isUserValid ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={isUserValid || !user ? "hide" : "invalid"} />
            </label>
            <input type="text" id="username" onChange={e => setUser(e.target.value)} />
            <p className={user && !isUserValid ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br />
              Must begin with a letter. <br />
              Letters, number, underscores, hyphens allowed
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon icon={faCheck} className={isPwdValid ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={isPwdValid || !pwd ? "hide" : "invalid"} />
            </label>
            <input type="password" id="password" onChange={e => setPwd(e.target.value)} />
            <p className={pwd && !isPwdValid ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character. <br />
              Allowed special characters: !@#$%
            </p>

            <label htmlFor="password-repeat">
              Confirm Password:
              <FontAwesomeIcon icon={faCheck} className={isPwdRepeatValid && pwdRepeat ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={isPwdRepeatValid || !pwdRepeat ? "hide" : "invalid"} />
            </label>
            <input type="password" id="password-repeat" onChange={e => setPwdRepeat(e.target.value)} />
            <p className={pwdRepeat && !isPwdRepeatValid ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the password
            </p>

            <button disabled={!isUserValid || !isPwdValid || !isPwdRepeatValid ? true : false}>Sign Up</button>
          </form>

          <p>
            Already registered? <br />
            <NavLink className="line" to='/login'>Sign In</NavLink>
          </p>
        </section>
      )}
    </>
  )
}

export default Register