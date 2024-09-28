import InputAdornment from '@mui/material/InputAdornment'
import { forwardRef } from 'react'
import FormInput from './FormInput'
import FormInputCheckIcon from './FormInputCheckIcon'

const FormInputWithCheck = forwardRef(({ checkState, ...props }, ref) => {
  return (
    <FormInput
      ref={ref}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end' disablePointerEvents>
            <FormInputCheckIcon checkState={checkState} />
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
})

FormInputWithCheck.displayName = 'FormInput'

FormInputWithCheck.propTypes = {
  checkState: FormInputCheckIcon.propTypes.checkState,
  ...FormInput.propTypes
}

export default FormInputWithCheck
