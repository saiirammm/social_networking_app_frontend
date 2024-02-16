import React, {useEffect, useState} from 'react'
import axios from '../config/axios'
import { Alert, Avatar, Box, Button, FormControl, Input, InputLabel, Snackbar, Stack,  Typography } from '@mui/material'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup' 
import { useDispatch, useSelector } from 'react-redux'
import { blue } from '@mui/material/colors'
import { createCommDispatch, editCommentDispatch } from '../actions/commentActions'
import Toaster from './Toaster'
export default function Comments(props){
    const {postId, data, commentId, handleEdit} = props
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [serverError, setServerError] = useState('')
    const user = useSelector((state)=>{
        return state.users.data
    })
    useEffect(()=>{
        setTimeout(()=>{
            setSuccess(false)
            setError(false)
        }, 6000)
    }, [success, error])
    const initialValues = {
        content: data ? data : '',
    }
    const validationSchema = Yup.object().shape({
        content: Yup.string()
        .required('email cannot be empty'),
        
    })
    const handleSubmit = async(values, {resetForm, setSubmitting}) => {
        try{
            setSubmitting(true)
            console.log(values, 'create')
            const response = await axios.post(`api/comment/${postId}`, values)
            setMessage(response.data.message)
            setTimeout(()=>{
                dispatch(createCommDispatch(response.data.comment))
                setSuccess(true)
                resetForm()
            }, 1000)
            
        }
        catch(e){
            console.log(e)
            setServerError(e.response.data.errors)
            setError(true)
        }
        finally{
            setSubmitting(false)
        }
    }
    const handleCEdit = async(values, {resetForm, setSubmitting}) => {
        try{
            setSubmitting(true)
            console.log(values, 'edit')
            const response = await axios.put(`api/comment/edit/${commentId}`, values)
            setMessage(response.data.message)
            setSuccess(true)
            setTimeout(()=>{
                dispatch(editCommentDispatch(response.data.comment))
                resetForm()
                handleEdit()
            }, 2000)
            
        }
        catch(e){
            console.log(e)
            setServerError(e.response.data.errors)
            setError(true)
        }
        finally{
            setSubmitting(false)
        }
    }
    return (
        <Box sx={{flex:{xs: 40, md: 4}}}>
            <Formik initialValues={initialValues} onSubmit={data ? handleCEdit : handleSubmit} validationSchema={validationSchema}>
                {(props)=>(
                    <Form >
                        <Stack display='flex' direction='row'>
                            <Avatar sx={{ bgcolor: blue[800] , height:'30px', width: '30px',fontSize: '15px',marginTop:'30px'}} aria-label="profile" >
                            {user.username ? <Typography  >{user.username[0].toUpperCase()}</Typography> : null}
                            </Avatar>
                        <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="comment">Comment</InputLabel>
                            <Field
                                as={Input}
                                id="comment"
                                name='content'
                            />
                        </FormControl>
                        <Button type='submit' size='small' sx={{color: 'black'}}>comment</Button><Button sx={{color: 'grey'}} onClick={data ? handleEdit : props.resetForm} size='small'>cancel</Button>
                        </Box>
                        </Stack>
                    </Form>
                )}
            </Formik>
            <Toaster success={success} successMsg={message}/>
            <Toaster error={error} errorMsg={serverError}/>
        </Box>
    )
}
