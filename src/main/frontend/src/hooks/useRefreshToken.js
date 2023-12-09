import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  async function refresh() {
    console.log(auth.refreshToken);
    const res = await axios.get('/refresh', {
      headers: {
        'Refresh-Token': auth.refreshToken
      }
    });
    setAuth(prev => {
      return { ...prev, accessToken: res.data, refreshToken: auth.refreshToken };
    });
    return res.data;
  }
  return refresh;
}

export default useRefreshToken;