import React from 'react'
import { NavLink } from 'react-router-dom'

import Users from '../components/Users'

function Admin() {
  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      <Users />
      <br />
      <p>You must been assigned in Admin role.</p>
      <div className="flexgrow">
        <NavLink to='/'>Home</NavLink>
      </div>
    </section>
  )
}

export default Admin