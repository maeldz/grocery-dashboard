import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.225.34.156:3389',
});

export default api;
