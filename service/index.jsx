import axios from 'axios';
import URL from '../urls'

const AxiosDefault = axios.create({
  headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
  timeout: 10000,
  baseURL: 'https://reqres.in/api/'
});

const get = async (url) => {
  try {
    const response = await AxiosDefault.get(url);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getUsers = async(params) => {
  return await get(`${URL.getUsersPath}${params}`);
}

export default {
  getUsers,
}