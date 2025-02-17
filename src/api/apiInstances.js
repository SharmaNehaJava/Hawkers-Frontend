import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hawkers-server.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('Token set in headers:', token); 
    } else {
      console.log('No token found in userInfo');
    }
  } else {
    console.log('No userInfo found in local storage');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



export default instance;
