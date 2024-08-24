const email = /^[\w-.]+@[\w-]+\.+[\w-]{2,4}$/
const username = /^[a-zA-Z0-9\-_.]{3,36}$/
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export default { email, username, password }
