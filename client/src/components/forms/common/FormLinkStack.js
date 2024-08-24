import PropTypes from 'prop-types'
import Stack from '@mui/material/Stack'

const FormLinkStack = ({ children }) => {
  return (
    <Stack
      direction='row'
      {...(children.length > 1
        ? { justifyContent: 'space-between' }
        : { justifyContent: 'center' })}
    >
      {children}
    </Stack>
  )
}

FormLinkStack.propTypes = {
  children: PropTypes.node.isRequired
}

export default FormLinkStack
