import React from 'react'
import { NavLink } from 'react-router-dom'

function Editor() {
  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div className="flexgrow">
        <NavLink to='/'>Home</NavLink>
      </div>
    </section>
  )
}

export default Editor