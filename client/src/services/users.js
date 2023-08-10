import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = await axios.get(baseUrl).then(response => response.data)
  return request
}

const createNew = async newUser => {
  const request = await axios
    .post(baseUrl, newUser)
    .then(response => response.data)
  return request
}

export default { getAll, createNew }
