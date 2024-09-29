import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <Card>
      <Stack justifyContent='center' alignItems='center' p={{ xs: 2, sm: 3 }}>
        <Typography variant='h2' align='center' gutterBottom>
          {'Ooops... This page does not exist.'}
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
      </Stack>
    </Card>
  )
}

export default NotFound
