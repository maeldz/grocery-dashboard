import axios from 'axios';

const api = axios.create({
  baseURL: 'https://groceryapi.tk',
});

export default api;
