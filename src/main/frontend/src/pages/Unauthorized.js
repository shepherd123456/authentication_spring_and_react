import React from 'react'
import { useNavigate } from 'react-router-dom'

function Unauthorized() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You dont have access to the requested page.</p>
      <div className="flexgrow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  )
}

export default Unauthorized