// this will be the component that will be rendered when the user tries to access a page that does not exist
import { Box, Typography } from '@mui/material'

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}
    >
      <Typography variant='h2' align='center' sx={{ fontWeight: 'bold' }}>
        404 Not Found
      </Typography>
    </Box>
  )
}

export default NotFound
