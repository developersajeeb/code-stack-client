import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const axiosSecure = axios.create({
  baseURL: 'https://code-stack-server.vercel.app',
});

const useAxiosSecure = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (authContext && authContext.logOut) {
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            await authContext.logOut();
            navigate('/login');
          }
        }
        return Promise.reject(error);
      }
    );
  }, [authContext, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;