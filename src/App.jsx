import theme from './config/theme'
import { Box, ThemeProvider } from "@mui/material"
import Header from "./components/Header"
import TabSection from './components/TabSection'
import FilterPanel from './components/FilterPanel'
import Products from './components/Products'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box>

                {/* Header */}
                <Header />

                {/* Tab Section */}
                <TabSection />

                {/* Main Section */}
                <Box display='flex'>

                    {/* Filter Panel */}
                    <FilterPanel />

                    {/* Product List */}
                    <Products />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App
