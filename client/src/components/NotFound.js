// this will be the component that will be rendered when the user tries to access a page that does not exist
import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}
    >
      <Typography
        variant='h2'
        align='center'
        sx={{ fontWeight: 'bold' }}
        gutterBottom
      >
        404 Not Found
      </Typography>
      <Button
        component={RouterLink}
        to='/'
        variant='contained'
        color='primary'
        size='large'
        sx={{ ml: 2 }}
      >
        Go Home
      </Button>
    </Box>
  )
}

export default NotFound
