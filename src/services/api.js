import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default {
  getData() {
    return axios.get(API_URL);
  }
};