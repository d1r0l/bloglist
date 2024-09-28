import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const FormHeader = ({ icon, label, comment }) => {
  return (
    <Stack>
      <Stack
        direction='row'
        gap={1.5}
        alignItems='center'
        justifyContent='center'
        mb={1}
        flexWrap='wrap'
      >
        <Avatar sx={{ bgcolor: 'secondary.main' }}>{icon}</Avatar>
        <Typography
          component='h2'
          variant='h4'
          fontWeight='bold'
          color='text.primary'
          align='center'
        >
          {label}
        </Typography>
      </Stack>
      {comment && (
        <Typography
          component='p'
          variant='body1'
          color='text.secondary'
          align='center'
          mb={2}
        >
          {comment}
        </Typography>
      )}
    </Stack>
  )
}

FormHeader.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  comment: PropTypes.string
}

export default FormHeader
