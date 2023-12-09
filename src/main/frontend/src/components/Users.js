import { useEffect, useState } from 'react'
import useAxiosJwt from '../hooks/useAxiosJwt';
import { useNavigate, useLocation } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  const axiosJwt = useAxiosJwt();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axiosJwt.get('/user');
        setUsers(res.data);
      } catch (err) {
        if (err.response.status === 400) {
          navigate('/login', {
            state: {
              from: location,
              errorMessage: err.response.data.message
            },
            replace: true
          });
        }
      }
    }
    getUsers();
  }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users.length ? (
        <ul>
          {users.map(u => <li key={u.id}>{u.username}</li>)}
        </ul>
      ) : (
        <p>No users</p>
      )}
    </article>
  )
}

export default Users