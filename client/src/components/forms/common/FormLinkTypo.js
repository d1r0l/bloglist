import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

/**
 * @param {import('@mui/material/Typography').TypographyProps} props
 */
const FormLinkTypo = ({ children, ...props }) => {
  return (
    <Typography variant='body2' color='text.secondary' {...props}>
      {children}
    </Typography>
  )
}

FormLinkTypo.propTypes = {
  children: PropTypes.node.isRequired
}

export default FormLinkTypo
