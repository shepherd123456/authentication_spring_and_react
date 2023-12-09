import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  function logout() {
    setAuth({});
    navigate('/linkpage');
  }

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>you are logged in!</p>
      <NavLink to='/editor'>Go to the editor page</NavLink>
      <br />
      <NavLink to='/admin'>Go to the admin page</NavLink>
      <br />
      <NavLink to='/lounge'>Go to the lounge page</NavLink>
      <br />
      <NavLink to='/linkpage'>Go to the link page</NavLink>
      <div className="flexgrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  )
}

export default Home