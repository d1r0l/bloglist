const email = /^[\w-.]+@[\w-]+\.+[\w-]{2,4}$/
const username = /^[a-zA-Z0-9\-_.]{3,36}$/
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const link =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

export default { email, username, password, link }
