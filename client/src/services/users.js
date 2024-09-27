import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const checkUsernameAndEmail = async (username, email) => {
  const request = await axios.post(`${baseUrl}/check`, {
    username: username,
    email: email
  })
  return request.data
}

const createNew = async newUser => {
  const request = await axios.post(baseUrl, newUser)
  return request.data
}

export default { getAll, createNew, checkUsernameAndEmail }
