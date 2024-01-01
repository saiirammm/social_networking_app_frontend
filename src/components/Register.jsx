import React, {useState} from 'react'
import axios from '../config/axios'
import { Alert, Box, Button, CircularProgress, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup' 
export default function Register(props){
    const {handleModalClose, handleOpenLoginModal} = props
    const [l, setL] = useState(false)
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [serverError, setServerError] = useState([])
    const initialValues = {
        username: '',
        email: '',
        password: ''
    }
    const handleLogIn = () => {
        handleModalClose()
        handleOpenLoginModal()
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .min(3, 'username must be 3 characters long')
        .required('username cannot be empty'),
        email: Yup.string()
        .email('enter valid email')
        .required('email cannot be empty'),
        password: Yup.string()
        .min(8, 'password should be between 8 to 128 character long')
        .max(128, 'password should be between 8 to 128 character long')
        .required('password cannot be empty')
    })
    const handleSubmit = async(values, props) => {
        console.log(values)
        try{
            setL(true)
            const response = await axios.post('api/user/register', values)
            setMessage(response.data.msg)
            setOpen(true)
            setTimeout(()=>{
                handleLogIn()
            },3000)
        }
        catch(e){
            console.log(e.response.data.errors)
            setL(false)
        }
    }
    return (
        <Box >
            <Paper sx={{width:'400px', padding: '20px 40px', margin:'0 auto', height:'450px'}} elevation={5}>
                <Typography variant='h6' textAlign='center' paddingBottom="10px">REGISTER</Typography>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {(props)=>(
                            <Form >
                                <Stack spacing={2}>
                                    <Field as={TextField}
                                    label="Username"
                                    name='username'
                                    type="text"
                                    variant='outlined'
                                    helperText={<ErrorMessage name='username'/>}
                                    required
                                    />
                                    <Field as={TextField}
                                    label="Email"
                                    name='email'
                                    type="email"
                                    variant='outlined'
                                    helperText={serverError.length ? serverError[0].msg : <ErrorMessage name='email'/>}
                                    required
                                    />
                                    <Field as={TextField}
                                    label="Password"
                                    name='password'
                                    type="password"
                                    variant='outlined'
                                    helperText={<ErrorMessage name='password'/>}
                                    required
                                    />
                                    <Button type='submit' color='primary' variant='contained'>{l ? <CircularProgress size='25px' color='inherit'/> : 'register'}</Button>
                                    <Button onClick={()=>{handleModalClose()}} color='error' variant='contained'>close</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                <Typography paddingTop='10px'>Already have an account? <Button onClick={handleLogIn}>login</Button></Typography>
                <Snackbar open={open} autoHideDuration={6000} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
                </Snackbar>
            </Paper>
        </Box>
    )
}