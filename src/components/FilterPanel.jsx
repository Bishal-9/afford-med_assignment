import { useEffect, useState } from 'react'
import api from '../config/api'
import { Box, Button, Checkbox, CircularProgress, Divider, OutlinedInput, Slider, Typography } from "@mui/material"
import Notify from './Notify'
import theme from '../config/theme'
import { useStateValue } from '../config/AppProvider'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'

const headerText = {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '27px',
    marginBottom: '15px',
}

const brandList = [
    {
        id: 1,
        name: 'Royal Fields'
    }, {
        id: 2,
        name: 'Crasmas Fields'
    }, {
        id: 3,
        name: 'Vegetarisma Farm'
    }, {
        id: 4,
        name: 'Farmer Field Eve'
    }, {
        id: 5,
        name: 'True Farmer Steve'
    }
]

const FilterPanel = () => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState('')
    const [{ selectedCategory, selectedRate }, dispatch] = useStateValue()

    useEffect(() => {
        const getProductsList = async () => {
            try {
                const response = await api.get('/products')
                setProducts(response.data)
            } catch (error) {
                setMessage(error.message)
            }
        }

        const getCategoryList = async () => {
            try {
                const response = await api.get('/products/categories')
                setCategories(response.data)
            } catch (error) {
                setMessage(error.message)
            }
        }

        getProductsList()
        getCategoryList()
    }, [])

    return (
        <Box width='300px' padding='45px'>

            {
                message && <Notify message={message} />
            }

            {/* Categories Section */}
            {
                (categories && products) ? (
                    <Box marginBottom='50px'>

                        {/* Heading */}
                        <Typography
                            variant='h5'
                            component='h5'
                            sx={headerText}
                        >
                            Categories
                        </Typography>

                        {/* Category List */}
                        {
                            categories.map((category, index) => (
                                <Box
                                    key={index}
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    marginBottom='10px'
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => dispatch({ type: 'SET_CATEGORY', category })}
                                >
                                    <Typography
                                        variant='body1'
                                        component='span'
                                        fontWeight={selectedCategory === category ? 'bold' : 'normal'}
                                        sx={{ textTransform: 'capitalize' }}
                                    >
                                        {category}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        component='span'
                                        color='primary'
                                        backgroundColor={theme.palette.primary.light}
                                        sx={{
                                            padding: '2px 10px',
                                            borderRadius: '30px'
                                        }}
                                    >
                                        {products.filter(product => product.category === category).length}
                                    </Typography>
                                </Box>
                            ))
                        }
                    </Box>
                ) : (
                    <Box width='100%' display='flex' justifyContent='center'>
                        <CircularProgress color='primary' />
                    </Box>
                )
            }

            {/* Brands */}
            <Box marginBottom='50px'>

                {/* Heading */}
                <Typography
                    variant='h5'
                    component='h5'
                    sx={headerText}
                >
                    Brands
                </Typography>

                {/* Brands List */}
                <Box>
                    {
                        brandList.map(brand => (
                            <Box key={brand.id} display='flex' alignItems='center'>
                                <Checkbox />
                                <Typography variant='body2' component='span'>{brand.name}</Typography>
                            </Box>
                        ))
                    }
                    </Box>
            </Box>

            {/* Rating */}
            <Box marginBottom='50px'>

                {/* Heading */}
                <Typography
                    variant='h5'
                    component='h5'
                    sx={headerText}
                >
                    Rating
                </Typography>

                {/* Rating List */}
                <Box>
                    {
                        Array(5).fill('').map((_, index) => (
                            <Box key={index} display='flex' alignItems='center'>
                                <Checkbox
                                    checked={selectedRate === 5 - index}
                                    value={selectedRate}
                                    onChange={() => dispatch({ type: 'SET_RATE', rate: 5 - index })}
                                />
                                <Box>
                                    {
                                        Array(5).fill('').map((_, i) => 5 - i <= index ?
                                            <StarOutlineRoundedIcon key={i} /> : <StarRateRoundedIcon key={i} sx={{ color: '#fdbc15' }} />
                                        )
                                    }
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Box>

            {/* Price */}
            <Box marginBottom='50px'>

                {/* Heading */}
                <Typography
                    variant='h5'
                    component='h5'
                    sx={headerText}
                >
                    Price
                </Typography>

                {/* Slider */}
                <Slider
                    value={[30, 50]}
                />

                {/* Range Input */}
                <Box display='flex' alignItems='center'>

                    {/* Min */}
                    <Box>
                        <Typography variant='body2' fontWeight='600' fontSize='12px'>Min</Typography>
                        <OutlinedInput
                            size='small'
                            placeholder='0'
                            sx={{
                                width: '90px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '12px !important'
                            }}
                        />
                    </Box>

                    <Divider
                        orientation='horizontal'
                        sx={{
                            width: '5px',
                            margin: '0 12px',
                            position: 'relative',
                            top: '8px',
                            color: '#a9a9a9'
                        }}
                    />

                    {/* Max */}
                    <Box>
                        <Typography variant='body2' fontWeight='600' fontSize='12px'>Max</Typography>
                        <OutlinedInput
                            size='small'
                            placeholder='000'
                            sx={{
                                width: '90px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '12px !important'
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Buttons */}
            <Box display='flex' alignItems='center' justifyContent='space-evenly'>

                {/* Apply button */}
                <Button
                    variant='contained'
                    onClick={e => {
                        e.preventDefault()
                        dispatch({ type: 'SET_APPLY' })
                    }}
                >
                    Apply
                </Button>

                {/* Reset button */}
                <Button
                    onClick={e => {
                        e.preventDefault()
                        dispatch({ type: 'SET_RESET' })
                    }}
                >
                    Reset
                </Button>

            </Box>
        </Box>
    )
}

export default FilterPanel
