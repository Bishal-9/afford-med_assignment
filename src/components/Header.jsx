import { useEffect, useState } from 'react'
import api from '../config/api'
import { useStateValue } from '../config/AppProvider'
import Notify from './Notify'
import {
    Badge,
    Box,
    Divider,
    Drawer,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from "@mui/material"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import Cart from './Cart'

const Header = () => {

    const [categoryList, setCategoryList] = useState([])
    const [message, setMessage] = useState('')
    const [showCart, setShowCart] = useState(false)
    const [{ cart, selectedCategory, search }, dispatch] = useStateValue()

    useEffect(() => {
        const getCategoryList = async () => {
            try {
                const response = await api.get('/products/categories')
                setCategoryList(response.data)
            } catch (error) {
                console.log(error.response.statusText)
                setMessage('Error Occurred!!')
            }
        }

        getCategoryList()
    }, [])

    return (
        <Box display='flex' alignItems='center' justifyContent='space-between' padding='20px 45px'>

            {
                message && <Notify message={message} />
            }

            {/* Brand Name */}
            <Typography
                variant="h1"
                component='h1'
                fontWeight='600'
                fontSize='26px'
                lineHeight='39px'
            >
                Sample Ecom
            </Typography>

            {/* Search bar */}
            <Box
                display='flex'
                alignItems='center'
                width='500px'
                backgroundColor='#f9f9f9'
                border='1px solid #d1d1d1'
                borderRadius='12px'
            >
                
                {/* Category List */}
                <FormControl sx={{ width: '200px', textTransform: 'capitalize' }}>
                    <InputLabel id='category-label' size='small'>All categories</InputLabel>
                    <Select
                        size='small'
                        labelId='category-label'
                        label='All categories'
                        value={selectedCategory}
                        onChange={e => dispatch({ type: 'SET_CATEGORY', category: e.target.value })}
                    >
                        {
                            categoryList.map(category => (
                                <MenuItem
                                    key={category}
                                    value={category}
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    {category}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                {/* Divider */}
                <Divider orientation="vertical" />

                {/* Input */}
                <FormControl>
                    <InputLabel htmlFor="search" size='small'>Search Products, categories...</InputLabel>
                    <OutlinedInput
                        id="search"
                        size='small'
                        type='text'
                        label='Search Products, categories...'
                        value={search}
                        onChange={e => dispatch({ type: 'SET_SEARCH', search: e.target.value })}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchRoundedIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Box>

            {/* Icons */}
                <Box display='flex' alignItems='center'>
                <IconButton onClick={e => e.preventDefault()}>
                    <PersonRoundedIcon />
                </IconButton>
                <IconButton
                    onClick={e => {
                        e.preventDefault()
                        setShowCart(!showCart)
                    }}
                >
                    <Badge badgeContent={cart.length} color='error'>
                        <ShoppingCartRoundedIcon />
                    </Badge>
                </IconButton>
            </Box>
            
            {/* Cart */}
            <Drawer
                anchor='right'
                open={showCart}
                onClose={() => setShowCart(false)}
            >
                <Cart setShowCart={setShowCart} />
            </Drawer>
        </Box>
    )
}

export default Header
