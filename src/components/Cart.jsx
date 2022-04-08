import { Box, Button, Typography } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useStateValue } from "../config/AppProvider"
import Item from "./Item"

const Cart = ({ setShowCart }) => {

    const [{ cart }, dispatch] = useStateValue()

    return (
        <Box width='400px' padding='20px'>

            {/* Header */}
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                marginBottom='20px'
                position='sticky'
                top='0'
                backgroundColor='#fff'
            >

                {/* Heading */}
                <Typography
                    variant="h2"
                    component='h2'
                    fontWeight='600'
                    fontSize='26px'
                    lineHeight='39px'
                >
                    Shopping cart
                </Typography>

                {/* Close button */}
                <Button
                    onClick={e => {
                        e.preventDefault()
                        setShowCart(false)
                    }}
                >
                    Close <CloseRoundedIcon />
                </Button>
            </Box>

            {/* Item List */}
            <Box>
                {
                    cart.length > 0 ? (
                        cart.map((item, index) => (
                            <Item key={index} item={item} />
                        ))
                    ) : (
                        <Typography>No items</Typography>
                    )
                }
            </Box>

            {/* Total Amount */}
            <Box paddingBottom='24px' borderBottom='1px solid #ebebeb'>
                <Typography
                    variant="subtitle2"
                    component='p'
                    fontWeight='600'
                    fontSize='12px'
                    lineHeight='18px'
                >
                    Subtotal
                </Typography>
                <Typography
                    variant="h2"
                    component='h2'
                    fontWeight='600'
                    fontSize='26px'
                    lineHeight='39px'
                >
                    {cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)} USD
                </Typography>
            </Box>

            {/* Checkout section */}
            <Box display='flex' alignItems='center' justifyContent='space-between' marginTop='15px'>

                {/* Greeting message */}
                <Typography
                    variant="body2"
                    component='p'
                    fontFamily='700'
                    fontSize='15px'
                    lineHeight='22px'
                >
                    Continue shopping
                </Typography>

                {/* Checkout button */}
                <Button size='small' variant="contained">Go to Checkout</Button>
            </Box>
        </Box>
    )
}

export default Cart