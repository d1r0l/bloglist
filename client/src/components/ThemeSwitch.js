import AutoModeIcon from '@mui/icons-material/AutoMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import IconButton from '@mui/material/IconButton'
import { useColorScheme } from '@mui/material/styles/ThemeProviderWithVars'
import PropTypes from 'prop-types'

const ThemeSwitch = ({ sx, ...props }) => {
  const { mode, setMode } = useColorScheme()
  const icons = {
    system: <AutoModeIcon sx={{ fontSize: { xs: '1.5rem', sm: '3rem' } }} />,
    light: <LightModeIcon sx={{ fontSize: { xs: '1.5rem', sm: '3rem' } }} />,
    dark: <DarkModeIcon sx={{ fontSize: { xs: '1.5rem', sm: '3rem' } }} />
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
      aria-description='Switch theme'
      variant='contained'
      sx={{
        width: { xs: 36.5, sm: 73 },
        height: { xs: 36.5, sm: 73 },
        minWidth: 'unset',
        minHeight: 'unset',
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
