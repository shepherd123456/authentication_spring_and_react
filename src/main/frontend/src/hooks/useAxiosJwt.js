import useRefreshToken from "./useRefreshToken"
import { useAuth } from '../context/AuthContext';
import { axiosJwt } from "../api/axios";
import { useEffect } from "react";

function useAxiosJwt() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosJwt.interceptors.request.use(
      conf => {
        if (!conf.headers['Authorization']) {
          conf.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return conf;
      }, err => Promise.reject(err)
    )

    const responseInterceptor = axiosJwt.interceptors.response.use(
      res => res,
      async err => {
        const prevReq = err.config;
        if (err.response.status === 401 && !prevReq.sent) {
          prevReq.sent = true;
          const newAccessToken = await refresh();
          prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosJwt(prevReq);
        }
        return Promise.reject(err);
      }
    )

    return () => {
      axiosJwt.interceptors.request.eject(requestInterceptor);
      axiosJwt.interceptors.response.eject(responseInterceptor);
    }
  }, [auth]);

  return axiosJwt;
}

export default useAxiosJwt