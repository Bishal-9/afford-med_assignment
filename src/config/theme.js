import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            light: '#f4f8ec',
            main: '#6A983C',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    borderRadius: '12px'
                }
            }
        },
    }
})

export default theme
