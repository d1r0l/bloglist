import createTheme from '@mui/material/styles/createTheme'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'

const defaultTheme = createTheme()

const themePalette = createTheme({
  palette: {
    primary: {
      light: '#48a871',
      main: '#3F9664',
      dark: '#398459',
      contrastText: '#fff'
    },
    secondary: {
      light: '#f04c97',
      main: '#ee007f',
      dark: '#ed0066',
      contrastText: '#fff'
    }
  }
}).palette

const theme = responsiveFontSizes(
  createTheme({
    palette: themePalette,
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h1: {
        fontFamily: 'Poppins',
        fontWeight: 600
      },
      label: {
        ...defaultTheme.typography.body2,
        color: themePalette.text.secondary,
        textAlign: 'center'
      }
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            label: 'p'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#f9f9f9'
          }
        }
      }
    }
  })
)

export default theme
