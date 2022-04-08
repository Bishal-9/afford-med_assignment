import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'
import { useStateValue } from "../config/AppProvider"

const Product = ({ product }) => {

    const [{ cart }, dispatch] = useStateValue()

    return (
        <Card sx={{ width: '270px', height: '350px', borderRadius: '12px', margin: '25px 15px' }}>

            {/* Product Details */}
            <CardContent sx={{ paddingBottom: '0' }}>

                {/* Image of the product */}
                <img
                    src={product.image}
                    alt={product.title}
                    width='236px'
                    height='180px'
                    style={{
                        borderRadius: '12px',
                        objectFit: 'contain',
                    }}
                />

                {/* Title */}
                <Typography
                    variant="h6"
                    component='h6'
                    fontWeight='500'
                    fontSize='15px'
                    lineHeight='22px'
                    sx={{
                        width: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: '15px',
                        marginBottom: '10px',
                    }}
                >
                    {product.title}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body1"
                    component='p'
                    fontWeight='400'
                    fontSize='12px'
                    lineHeight='16px'
                    color='#575757'
                    sx={{
                        width: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: '10px',
                    }}
                >
                    {product.description}
                </Typography>

                {/* Rating */}
                <Box display='flex'>
                    {
                        Array(5).fill('').map((_, i) => Math.round(product?.rating?.rate) <= i ?
                            <StarOutlineRoundedIcon key={i} sx={{ fontSize: '20px' }} /> : <StarRateRoundedIcon key={i} sx={{ fontSize: '20px' }} />
                        )
                    }
                </Box>
            </CardContent>

            {/* Price with Add to CArt button */}
            <CardActions sx={{ padding: '7px 15px', justifyContent: 'space-between' }}>

                {/* Price */}
                <Typography
                    variant="subtitle1"
                    fontWeight='600'
                    fontSize='18px'
                    lineHeight='27px'
                >
                    {product.price} USD
                </Typography>

                {/* Add to cart button */}
                <Button
                    size='small'
                    variant='contained'
                    onClick={e => {
                        e.preventDefault()
                        let newCart
                        if (cart.find(item => item.product.id === product.id)) {
                            newCart = cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                        } else {
                            newCart = [
                                ...cart,
                                {
                                    quantity: 1,
                                    product
                                }
                            ]
                        }
                        dispatch({ type: 'SET_CART', cart: newCart })
                    }}
                >
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    )
}

export default Product
