const { PORT } = require('./utils/config')
const app = require('./app')

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`)
})
