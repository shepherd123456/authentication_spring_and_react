import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LOGIN_URL = '/login';

function Login() {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const errorMessage = location.state?.errorMessage;

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');


  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  useEffect(() => {
    if (errorMessage) {
      setErrMsg(errorMessage);
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(LOGIN_URL, {
        username: user,
        password: pwd
      });
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;
      const roles = res.data.roles;
      setAuth({ user, pwd, accessToken, refreshToken, roles });
      console.log(refreshToken);
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response?.status === 403) {
        setErrMsg('wrong username or password');
      } else {
        setErrMsg('Login Failed');
      }
    }
  }

  return (
    <section>
      <p className={errMsg ? 'errmsg' : 'hide'}>{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" onChange={e => setUser(e.target.value)} value={user} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={e => setPwd(e.target.value)} value={pwd} required />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account? <br />
        <NavLink className="link" to='/register'>Sign Up</NavLink>
      </p>
    </section>
  )
}

export default Login