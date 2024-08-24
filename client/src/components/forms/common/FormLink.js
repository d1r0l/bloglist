import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const textProps = {
  variant: 'body2',
  color: 'text.secondary',
  sx: { display: 'inline' }
}

const FormLinkResetPass = ({ to, text, beforeText = '', afterText = '' }) => {
  return (
    <div>
      {beforeText && <Typography {...textProps}>{beforeText} </Typography>}
      <Link component={RouterLink} to={to} variant='body2'>
        {text}
      </Link>
      {afterText && <Typography {...textProps}> {afterText}</Typography>}
    </div>
  )
}

FormLinkResetPass.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  beforeText: PropTypes.string,
  afterText: PropTypes.string
}

export default FormLinkResetPass
