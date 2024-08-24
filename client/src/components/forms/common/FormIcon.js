import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

const FormIcon = ({ children }) => {
  return (
    <Box display='flex' justifyContent='center'>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{children}</Avatar>
    </Box>
  )
}

FormIcon.propTypes = {
  children: PropTypes.node
}

export default FormIcon
