import axios from 'axios';

const apiTodoList = axios.create({
  baseURL: 'http://localhost:3003'
});

export default apiTodoList;