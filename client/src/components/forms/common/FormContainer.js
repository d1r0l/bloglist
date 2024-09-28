import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'

const FormContainer = ({ children }) => {
  return (
    <Box
      display='flex'
      alignItems={'center'}
      justifyContent={'center'}
      minHeight={'75dvh'}
      maxWidth='xs'
    >
      <Container maxWidth='xs' disableGutters>
        {children}
      </Container>
    </Box>
  )
}

FormContainer.propTypes = {
  children: PropTypes.node
}

export default FormContainer
