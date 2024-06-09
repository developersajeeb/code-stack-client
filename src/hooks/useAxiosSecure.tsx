import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

interface AuthContextType {
  logOut: () => Promise<void>;
}

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('useAxiosSecure must be used within an AuthProvider');
  }

  const { logOut } = authContext;

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      console.log('Token:', token); // Logging the token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('Request config:', config); // Logging the entire request config
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => {
        console.log('Response:', response); // Logging the entire response
        return response;
      },
      async (error) => {
        console.error('Error response:', error.response); // Logging the error response
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          // Attempt to refresh the token here
          try {
            const refreshToken = localStorage.getItem('refresh-token');
            const response = await axios.post('http://localhost:5000/refresh-token', { token: refreshToken });
            const newToken = response.data.accessToken;
            localStorage.setItem('access-token', newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosSecure(originalRequest);
          } catch (refreshError) {
            await logOut();
            navigate('/login');
            return Promise.reject(refreshError);
          }
        }
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
