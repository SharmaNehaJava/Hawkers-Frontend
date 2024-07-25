// src/api/axiosInstance.js (or any suitable file name)
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Ensure this matches your backend server URL
});

export default instance;
