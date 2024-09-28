import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

const Form = ({ children, onSubmit }) => {
  return (
    <Box component='form' onSubmit={onSubmit} noValidate>
      {children}
    </Box>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Form
