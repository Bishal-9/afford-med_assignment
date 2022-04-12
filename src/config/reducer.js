// Initial App State
export const initialState = {
    selectedRate: '',
    selectedCategory: '',
    search: '',
    isApplied: false,
    cart: []
}

export const actionTypes = {
    SET_CATEGORY: "SET_CATEGORY",
    SET_SEARCH: "SET_SEARCH",
    SET_RATE: 'SET_RATE',
    SET_RESET: 'SET_RESET',
    SET_APPLIED: 'SET_APPLIED',
    FLUSH_APPLIED: 'FLUSH_APPLIED',
    SET_CART: 'SET_CART',
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_CATEGORY:
            return {
                ...state,
                selectedCategory: action.category,
            }
        
        case actionTypes.SET_SEARCH:
            return {
                ...state,
                search: action.search
            }
        
        case actionTypes.SET_RATE:
            return {
                ...state,
                selectedRate: action.rate
            }
        
        case actionTypes.SET_RESET:
            return {
                ...state,
                selectedRate: '',
                selectedCategory: '',
                search: '',
                isApplied: false
            }
        
        case actionTypes.SET_APPLIED:
            return {
                ...state,
                isApplied: true
            }
        
        case actionTypes.FLUSH_APPLIED:
            return {
                ...state,
                isApplied: false
            }
        
        case actionTypes.SET_CART:
            return {
                ...state,
                cart: action.cart
            }

        default:
            return state
    }
}

export default reducer