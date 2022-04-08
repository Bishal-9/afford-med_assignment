import ReactDom from "react-dom"
import { useState } from "react"
import { Alert, Snackbar } from "@mui/material"

const Notify = ({ message, type = 'error' }) => {

    const [isOpen, setIsOpen] = useState(true)

    return ReactDom.createPortal(
        <Snackbar open={isOpen} autoHideDuration={5000} onClose={() => setIsOpen(false)}>
            <Alert onClose={() => setIsOpen(false)} severity={type}>
                {message}
            </Alert>
        </Snackbar>,
        document.getElementById("notify")
    )
}

export default Notify