import axios from 'axios'
const baseUrl = '/api/forgotpassword'

const reset = async email => {
  const request = await axios
    .post(baseUrl, email)
    .then(response => response.data)
  return request
}

const change = async (userId, token, password) => {
  const request = await axios
    .post(`${baseUrl}/${userId}/${token}`, password)
    .then(response => response.data)
  return request
}

export default { reset, change }
