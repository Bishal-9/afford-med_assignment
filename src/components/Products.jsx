import { useEffect, useState } from "react"
import api from '../config/api'
import { Box, CircularProgress } from "@mui/material"
import Notify from "./Notify"
import Product from "./Product"

const Products = () => {

    const [productList, setProductList] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const getProductList = async () => {
            try {
                const response = await api.get('/products')
                setProductList(response.data)
            } catch (error) {
                setMessage(error.message)
            }
        }

        getProductList()
    }, [])

    return (
        <Box
            width='100%'
            minHeight='300px'
            height='100%'
            display='flex'
            flexWrap='wrap'
            alignItems='center'
            justifyContent='flex-start'
        >
            {
                message && <Notify message={message} />
            }

            {
                productList.length === 0 ? (
                    <CircularProgress color="primary" />
                ) : (
                    productList.map(product => (
                        <Product key={product.id} product={product} />
                    ))
                )
            }
        </Box>
    )
}

export default Products
