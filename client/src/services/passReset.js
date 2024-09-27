import axios from 'axios'
const baseUrl = '/api/forgotpassword'

const reset = async email => {
  const request = await axios.post(baseUrl, email)
  return request.data
}

const change = async (userId, token, password) => {
  const request = await axios.post(`${baseUrl}/${userId}/${token}`, {
    password
  })
  return request.data
}

export default { reset, change }
