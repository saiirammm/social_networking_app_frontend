import React from "react"
import { Alert, Box, Snackbar } from "@mui/material"

export default function Toaster(props){
    const {success, successMsg, error, errorMsg} = props
    console.log(error, success)
    return (
        <Box>
            <Snackbar open={success} autoHideDuration={6000} >
            <Alert severity="success" sx={{ width: '100%' }}>
                {successMsg}
            </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} >
            <Alert severity="error" sx={{ width: '100%' }}>
                {errorMsg}
            </Alert>
            </Snackbar>
        </Box>
    )
}