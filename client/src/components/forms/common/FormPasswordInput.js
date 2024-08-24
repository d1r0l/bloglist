import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import FormInput from './FormInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const FormPasswordInput = forwardRef(
  ({ showPassword, togglePassword, ...props }, ref) => {
    return (
      <FormInput
        type={showPassword ? 'text' : 'password'}
        ref={ref}
        onCut={e => e.preventDefault()}
        onCopy={e => e.preventDefault()}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={togglePassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...props}
      />
    )
  }
)

FormPasswordInput.displayName = 'FormInput'

FormPasswordInput.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  togglePassword: PropTypes.func.isRequired,
  ...FormInput.propTypes
}

export default FormPasswordInput
