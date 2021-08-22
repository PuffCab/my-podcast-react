import { createContext, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { teal, red } from "@material-ui/core/colors";



const defaultContext = {
    activeTheme: 'light',
    // toggleTheme: () => {
    //     throw new Error('toggleTheme() not implemented')
    // }
}
// 1 ->  create context

export const ThemeContext = createContext(defaultContext)

// 2 -> create provider

export const ThemeProvider = ({children}) => {
 

    // 3 -> move state and function

        const [activeTheme, toggleTheme] = useState('light')

        const defaultTheme = createTheme({})

        const palette = {
            ...defaultTheme.palette,
            primary: { main: teal[600]},
            secondary: {main: red.A100},
            background : {
                default: activeTheme === 'light' ? '#fff' : '#212121',
                paper: activeTheme === 'light' ? '#EDEBE9' : '#424242',
            },
            text: {
                default: activeTheme === 'light' ? '#3B454E' : '#fff',
            },
            type: activeTheme || 'light',
        }
        
        const muiTheme = createTheme({
            ...defaultTheme,
            palette,
            props: {
              '&:hover': {
                MuiSvgIcon: {
                  htmlColor: '#fff',
        
                }
              },
              MuiSvgIcon: {
                // htmlColor: '#fff',
                htmlColor: activeTheme === 'light' ? '#424242' : '#fff',
        
              }
            },
            typography: {
              h2: {
                paddingTop: '1.2rem',
                fontSize: '1rem',
                '@media (min-width:600px)': {
                  fontSize: '1.3rem',
                },
                [defaultTheme.breakpoints.up('md')]: {
                  fontSize: '2rem',
                },
              },
              h3: {
                paddingTop: '1rem',
                fontSize: '1rem',
                '@media (min-width:600px)': {
                  fontSize: '1rem',
                },
                [defaultTheme.breakpoints.up('md')]: {
                  fontSize: '	1.125rem',
                },
              },
              fontFamily: [
                // '-apple-system',
                'BlinkMacSystemFont',
                // '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(','),
            },
          });
        

    // 4 -> return the provider with its value & inject children component

    return (
        <ThemeContext.Provider
          value={{
            activeTheme,
            toggleTheme
          }}>
          <MuiThemeProvider theme={muiTheme}>
            {children}
          </MuiThemeProvider>
        </ThemeContext.Provider>
      )
}









