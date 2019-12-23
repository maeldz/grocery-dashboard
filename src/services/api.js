import axios from 'axios';

const api = axios.create({
  baseURL: 'http://groceryapi.tk',
});

export default api;
