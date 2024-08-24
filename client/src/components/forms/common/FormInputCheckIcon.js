import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import CircularProgress from '@mui/material/CircularProgress'

const FormInputCheckIcon = ({ checkState }) => {
  return (
    <div style={{ display: 'inline-flex', padding: '8px' }}>
      {checkState === 'off' && (
        <CircularProgress size={24} sx={{ color: '#00000000' }} />
      )}
      {checkState === 'available' && <CheckIcon color='success' />}
      {checkState === 'taken' && <ClearIcon color='error' />}
      {checkState === 'validating' && (
        <CircularProgress color='inherit' size={24} />
      )}
    </div>
  )
}

FormInputCheckIcon.propTypes = {
  checkState: function (props, propName, componentName) {
    if (!/^(off|available|taken|validating)$/.test(props[propName])) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      )
    }
  }
}

export default FormInputCheckIcon
