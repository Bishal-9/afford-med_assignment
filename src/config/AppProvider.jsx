import { createContext, useContext, useReducer } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ reducer, initialState, children }) => (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AppContext.Provider>
)

export const useStateValue = () => useContext(AppContext)