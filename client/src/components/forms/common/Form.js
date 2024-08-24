import PropTypes from 'prop-types'
import Box from '@mui/material/Box'

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
