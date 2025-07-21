import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Automatically set token from refresh if possible on first load
    const tryRefresh = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/refresh-token', {}, { withCredentials: true });
        setToken(res.data.token);
      } catch (err) {
        setToken(null);
      }
    };
    tryRefresh();
  }, []);

  // Axios interceptor for auth + auto-refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If unauthorized, try to refresh token
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const res = await axios.post('http://localhost:5000/api/refresh-token', {}, { withCredentials: true });
            const newToken = res.data.token;
            setToken(newToken);

            // Update and retry original request
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }, [token]);

  return <Component {...pageProps} token={token} setToken={setToken} />;
}
