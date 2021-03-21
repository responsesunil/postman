import axios from 'axios'

axios.defaults.baseURL = 'https://reqres.in/';

export async function get(url) {
    const response = await axios.get(url)
    return response.data
}

export async function post(url, data) {
  const response = await axios.post(url, {
    data
  })
  return response.data
}

export async function put(url, data) {
  const response = await axios.put(url, {
    data
  })
  return response.data
}

export async function deleteApi(url) {
  const response = await axios.delete(url)
  return response.data
}