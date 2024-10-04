import createTheme from '@mui/material/styles/createTheme'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'

const theme = responsiveFontSizes(
  createTheme({
    colorSchemes: {
      light: {
        palette: {
          mode: 'light',
          background: {
            paper: '#fafafa'
          },
          primary: {
            main: '#3f845c',
            light: '#459667',
            dark: '#356447',
            contrastText: '#fff'
          },
          secondary: {
            light: '#db5087',
            main: '#c34b7e',
            dark: '#ac4777',
            contrastText: '#fff'
          }
        }
      },
      dark: {
        palette: {
          mode: 'light',
          background: {
            paper: '#101010'
          },
          primary: {
            main: '#3f845c',
            light: '#459667',
            dark: '#356447',
            contrastText: '#fff'
          },
          secondary: {
            light: '#db5087',
            main: '#c34b7e',
            dark: '#ac4777',
            contrastText: '#fff'
          }
        }
      }
    },
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
      }
    }
  })
)

export default theme
