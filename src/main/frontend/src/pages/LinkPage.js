import { NavLink } from "react-router-dom"

function LinkPage() {
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Register</NavLink>
      <br />
      <h2>Private</h2>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/editor'>Editor Page</NavLink>
      <NavLink to='/admin'>Admin Page</NavLink>
    </section>
  )
}

export default LinkPage