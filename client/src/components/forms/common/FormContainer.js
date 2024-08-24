import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const FormContainer = ({ children }) => {
  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Box display='flex' flexDirection='column' justifyContent='center'>
        {children}
      </Box>
    </Container>
  )
}

FormContainer.propTypes = {
  children: PropTypes.node
}

export default FormContainer
