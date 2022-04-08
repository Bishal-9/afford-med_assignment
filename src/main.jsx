import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { AppProvider } from './config/AppProvider'
import reducer, { initialState } from './config/reducer'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <AppProvider initialState={initialState} reducer={reducer}>
            <App />
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
