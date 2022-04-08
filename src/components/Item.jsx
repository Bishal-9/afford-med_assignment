import { useStateValue } from '../config/AppProvider'
import { Box, Divider, Typography } from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

const Item = ({ item }) => {
    
    const [{ cart }, dispatch] = useStateValue()
    
    return (
        <Box display='flex' borderBottom='1px solid #f9f9f9' paddingBottom='15px' marginBottom='30px'>

            {/* Left section */}
            <Box>

                {/* Image */}
                <img
                    width='100px'
                    height='70px'
                    src={item.product.image}
                    alt={item.product.title}
                    style={{
                        borderRadius: '12px',
                        objectFit: 'contain',
                    }}
                />

                {/* Wishlist */}
                <Box display='flex' alignItems='center' marginTop='10px' marginBottom='7px'>
                    <FavoriteBorderRoundedIcon sx={{ fontSize: '15px', marginRight: '10px' }} />
                    <Typography variant='body2' fontSize='12px' color='#a9a9a9'>Wishlist</Typography>
                </Box>

                {/* Compare */}
                <Box display='flex' alignItems='center' marginBottom='7px'>
                    <FactCheckRoundedIcon sx={{ color: '#e5704b', fontSize: '15px', marginRight: '10px' }} />
                    <Typography variant='body2' fontSize='12px' color='#a9a9a9'>Compare</Typography>
                </Box>

                {/* Remove */}
                <Box
                    display='flex'
                    alignItems='center'
                    marginBottom='7px'
                    sx={{
                        cursor: 'pointer'
                    }}
                    onClick={() => {

                        // If Product has more than 1 quantity then decrease quantity by 1 else remove product from cart
                        if (item.quantity > 1) {
                            const newCart = cart.map(product => {
                                if (product.product.id === item.product.id) {
                                    return {
                                        ...product,
                                        quantity: product.quantity - 1
                                    }
                                } else {
                                    return product
                                }
                            })
                            dispatch({
                                type: 'SET_CART',
                                cart: newCart
                            })
                        } else {
                            const newCart = cart.filter(product => product.product.id !== item.product.id)
                            dispatch({
                                type: 'SET_CART',
                                cart: newCart
                            })
                        }
                    }}
                >
                    <CloseRoundedIcon sx={{ fontSize: '15px', marginRight: '10px' }} />
                    <Typography variant='body2' fontSize='12px' color='#a9a9a9'>Remove</Typography>
                </Box>
            </Box>

            {/* Right section */}
            <Box marginLeft='15px'>

                {/* Product Title */}
                <Typography
                    variant='h4'
                    component='h4'
                    fontWeight='500'
                    fontSize='15px'
                    lineHeight='22px'
                >
                    {item.product.title}
                </Typography>

                {/* Product Description */}
                <Typography
                    variant='body1'
                    component='p'
                    fontWeight='400'
                    fontSize='12px'
                    lineHeight='16px'
                    color='#a9a9a9'
                    sx={{
                        width: '250px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginY: '10px',
                    }}
                >
                    {item.product.description}
                </Typography>

                {/* Rating */}
                <Box display='flex'>
                    {
                        Array(5).fill('').map((_, i) => Math.round(item.product?.rating?.rate) <= i ?
                            <StarOutlineRoundedIcon key={i} sx={{ fontSize: '20px' }} /> : <StarRateRoundedIcon key={i} sx={{ fontSize: '20px' }} />
                        )
                    }
                </Box>

                {/* Price and Quantity */}
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    marginTop='12px'
                >

                    {/* Price */}
                    <Typography
                        variant='subtitle1'
                        component='p'
                        fontWeight='600'
                        fontSize='18px'
                        lineHeight='27px'
                        color='primary'
                    >
                        {item.product.price} USD
                    </Typography>

                    {/* Quantity */}
                    <Box
                        display='flex'
                        alignItems='center'
                        backgroundColor='#f9f9f9'
                        border='1px solid #d1d1d1'
                        borderRadius='12px'
                        paddingX='7px'
                    >
                        <Typography
                            variant='body2'
                            component='p'
                            fontWeight='400'
                            fontSize='14px'
                            lineHeight='19px'
                            color='#d1d1d1'
                        >
                            {item.quantity} pcs
                        </Typography>

                        {/* Divider */}
                        <Divider
                            orientation='vertical'
                            variant='middle'
                            sx={{
                                height: '12px',
                                marginX: '10px',
                                border: '1px solid #d1d1d1 !important',
                            }}
                        />

                        {/* Unit */}
                        <Typography
                            variant='body2'
                            component='p'
                            fontWeight='600'
                            fontSize='12px'
                            lineHeight='18px'
                        >
                            Pcs 
                        </Typography>

                        {/* Down Arrow */}
                        <KeyboardArrowDownRoundedIcon sx={{ color: '#151515 !important', fontSize: '15px', marginLeft: '4px' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Item