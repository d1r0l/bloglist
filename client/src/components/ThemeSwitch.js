import AutoModeIcon from '@mui/icons-material/AutoMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import IconButton from '@mui/material/IconButton'
import { useColorScheme } from '@mui/material/styles/ThemeProviderWithVars'
import PropTypes from 'prop-types'

const ThemeSwitch = ({ sx, ...props }) => {
  const { mode, setMode } = useColorScheme()
  const icons = {
    system: <AutoModeIcon />,
    light: <LightModeIcon />,
    dark: <DarkModeIcon />
  }

  const cycleTheme = () => {
    switch (mode) {
      case 'system':
        return setMode('light')
      case 'light':
        return setMode('dark')
      case 'dark':
        return setMode('system')
      default:
        return setMode('system')
    }
  }

  return (
    <IconButton
      onClick={cycleTheme}
      variant='contained'
      title='Switch theme'
      sx={{
        float: 'right',
        ...sx
      }}
      {...props}
    >
      {icons[mode]}
    </IconButton>
  )
}

ThemeSwitch.propTypes = {
  sx: PropTypes.object
}

export default ThemeSwitch
