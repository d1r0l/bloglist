import createTheme from '@mui/material/styles/createTheme'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'
import { alpha, getContrastRatio } from '@mui/system/colorManipulator'

const defaultTheme = createTheme()

const blackBase = '#000'
const whiteBase = '#fff'
const greenBase = '#007031'
const pinkBase = '#e6007a'
const greenMain = alpha(greenBase, 0.7)
const pinkMain = alpha(pinkBase, 0.7)

const getContrastTextColor = (color) =>
  getContrastRatio(color, '#fff') > 4.5
    ? alpha(whiteBase, 0.99)
    : alpha(blackBase, 0.99)

const themePalette = createTheme({
  palette: {
    primary: {
      main: greenMain,
      light: alpha(greenBase, 0.5),
      dark: alpha(greenBase, 0.9),
      contrastText: getContrastTextColor(greenMain)
    },
    secondary: {
      main: pinkMain,
      light: alpha(pinkBase, 0.5),
      dark: alpha(pinkBase, 0.9),
      contrastText: getContrastTextColor(pinkMain)
    },
    paper: alpha(blackBase, 0.025)
  }
}).palette

const theme = responsiveFontSizes(
  createTheme({
    palette: themePalette,
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h1: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600
      },
      h2: {
        fontWeight: 600
      },
      h3: {
        fontWeight: 600
      },
      h4: {
        fontWeight: 600
      },
      h5: {
        fontWeight: 600
      },
      h6: {
        fontWeight: 600
      },
      subtitle1: {
        color: themePalette.text.secondary
      },
      subtitle2: {
        color: themePalette.text.secondary
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
            backgroundColor: themePalette.paper
          }
        }
      }
    }
  })
)

export default theme
