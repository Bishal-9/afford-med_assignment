import { useEffect, useState } from "react"
import api from '../config/api'
import { useStateValue } from '../config/AppProvider'
import { Box, CircularProgress } from "@mui/material"
import Notify from "./Notify"
import Product from "./Product"

const Products = () => {

    const [productList, setProductList] = useState('Loading')
    const [message, setMessage] = useState('')
    const [{ selectedCategory, selectedRate, isApplied }, dispatch] = useStateValue()

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

    useEffect(() => {
        setProductList('Loading')
        if (isApplied && selectedRate && selectedCategory) {
            const getProductListByCategoryRate = async () => {
                try {
                    const response = await api.get(`/products/category/${selectedCategory}`)
                    const newProductList = response.data.filter(product => Math.round(product.rating.rate) === selectedRate)
                    setProductList(newProductList)
                } catch (error) {
                    setMessage(error.message)
                }
            }

            dispatch({ type: 'FLUSH_APPLIED' })
            getProductListByCategoryRate()
        } else if (isApplied && selectedRate) {
            const getProductListRate = async () => {
                try {
                    const response = await api.get('/products')
                    const newProductList = response.data.filter(product => Math.round(product.rating.rate) === selectedRate)
                    setProductList(newProductList)
                } catch (error) {
                    setMessage(error.message)
                }
            }
            getProductListRate()
            
            dispatch({ type: 'FLUSH_APPLIED' })
        } else if (isApplied && selectedCategory) {
            const getProductListByCategory = async () => {
                try {
                    const response = await api.get(`/products/category/${selectedCategory}`)
                    console.log(response.data)
                    setProductList(response.data)
                } catch (error) {
                    setMessage(error.message)
                }
            }

            dispatch({ type: 'FLUSH_APPLIED' })
            getProductListByCategory()
        }
    }, [isApplied])

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
                productList === 'Loading' ? (
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
