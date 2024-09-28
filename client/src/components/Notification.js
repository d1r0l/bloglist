import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {
  notificationColorSelector,
  notificationTextSelector
} from '../selectors'

let open = true

const Notification = () => {
  const text = notificationTextSelector()
  const color = notificationColorSelector()

  if (text === '') return null
  else {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          autoHideDuration={5000}
        >
          <Alert
            severity={color === 'green' ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {text}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

export default Notification
