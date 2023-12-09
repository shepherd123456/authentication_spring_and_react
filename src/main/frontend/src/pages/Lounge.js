import React from 'react'
import { NavLink } from 'react-router-dom'

function Lounge() {
  return (
    <section>
      <h1>The Lounge</h1>
      <br />
      <p>Admins and Editors can hang out here.</p>
      <div className="flexgrow">
        <NavLink to='/'>Home</NavLink>
      </div>
    </section>
  )
}

export default Lounge