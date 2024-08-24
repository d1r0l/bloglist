import { forwardRef } from 'react'
import TextField from '@mui/material/TextField'

const FormInput = forwardRef((props, ref) => {
  return (
    <TextField
      variant='outlined'
      margin='dense'
      fullWidth
      ref={ref}
      {...props}
    />
  )
})

FormInput.displayName = 'FormInput'

FormInput.propTypes = {
  ...TextField.propTypes
}

export default FormInput
