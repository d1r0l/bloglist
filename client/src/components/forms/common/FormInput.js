import { forwardRef } from 'react'
import TextField from '@mui/material/TextField'

const FormInput = forwardRef((props, ref) => {
  return (
    <TextField
      variant='outlined'
      size='small'
      margin='dense'
      fullWidth
      ref={ref}
      sx={{
        '& .MuiOutlinedInput-root': {
          paddingRight: '0!important'
        },
        '& .MuiInputAdornment-root': {
          marginLeft: '0!important'
        }
      }}
      {...props}
    />
  )
})

FormInput.displayName = 'FormInput'

export default FormInput
