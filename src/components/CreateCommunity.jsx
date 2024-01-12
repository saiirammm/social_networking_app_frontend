import React,{useState} from 'react'
import axios from '../config/axios'
import { Alert, Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Snackbar, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup' 
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { comEditDispatch, createCom } from '../actions/communityAction'


export default function CreateCommunity(props){
    const [l, setL] = useState(false)
    const [message, setMessage] = useState('')
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const categoryData = useSelector((state)=>{
        return state.categories.data
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initialValues = {
        name: location.state ? location.state.community.name : '' ,
        description: location.state ? location.state.community.description : '',
        category: location.state ? location.state.community.category : '',
        premium: location.state ? location.state.community.premium : false,
        membershipFee: location.state ? location.state.community.membershipFee : 0
        
    }
    const handleSubmitCreate = async(values, {resetForm, setSubmitting}) => {
        try{
            setL(true)
            const response = await axios.post('api/community/create', values)
            console.log(response.data)
            dispatch({type: 'CREATE_COM', payload: response.data.community})
            setMessage(response.data.msg)
            setOpen(true)
            setTimeout(()=>{
                resetForm()
                setSubmitting(true)
                navigate(`/show/community`, {state:{id: response.data.community._id}})
            },3000)
        }
        catch(e){
            setL(false)
        }
    }
    const handleSubmitEdit = async(values, {resetForm, setSubmitting}) => {
        try{
            setL(true)
            const response = await axios.put(`/api/community/edit/${location.state.community._id}`, values)
            console.log(response.data)
            dispatch(comEditDispatch(response.data.community))
            setMessage(response.data.message)
            setOpen(true)
            setTimeout(()=>{
                resetForm()
                setSubmitting(true)
                navigate(`/show/community`, {state: {id: response.data.community._id}})
            },3000)
        }
        catch(e){
            setL(false)
        }
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Username must be 3 characters long').required('Name cannot be empty'),
        description: Yup.string().required('Description cannot be empty'),
        category: Yup.string().required('Category must be selected'),
         membershipFee: Yup.number().when('premium', {
            is: true,
            then:() => Yup.number()
            .min(1, 'Fee should be at least 1 rupee')
            .required('Membership fee is required when premium is true'),
            otherwise:()=> Yup.number().notRequired(),
        })
      });
    return (
        <Box sx={{flex:{xs: 40, md: 4}}} p={2}>
            <Paper sx={{width:'auto', padding: '20px 40px', margin:'0 auto', height:'auto'}} elevation={5}>
                <Typography variant='h6' textAlign='center' paddingBottom="10px">Create Community</Typography>
                    <Formik initialValues={initialValues} onSubmit={location.state ? handleSubmitEdit : handleSubmitCreate} validationSchema={validationSchema}>
                        {(props)=>(
                            <Form >
                                <Stack spacing={2}>
                                    <Field as={TextField}
                                    label="name"
                                    name='name'
                                    type="text"
                                    variant='outlined'
                                    helperText={<ErrorMessage name='name'/>}
                                    required
                                    />
                                    <Field
                                        as={TextareaAutosize} 
                                        label="Description"
                                        name="description"
                                        variant="outlined"
                                        minRows={2}
                                        aria-label="description"
                                        placeholder="Enter your description"
                                        style={{ width: '100%', minHeight: '50px', padding: '5px',borderRadius: '5px' }} 
                                    />
                                    <Typography variant="caption" color="textSecondary" gutterBottom>{<ErrorMessage name='description'/>}</Typography>
                                    <FormControl fullWidth>
                                        <InputLabel id="category">category</InputLabel>
                                        <Field as={Select} name="category" labelId="category" label="category" onChange={props.handleChange}>
                                            {categoryData.map(e=>{
                                                return <MenuItem value={e._id} key={e._id}>{e.name}</MenuItem>
                                            })}
                                        </Field>
                                        <Typography variant="caption" color="textSecondary" gutterBottom>{<ErrorMessage name='category'/>}</Typography>
                                    </FormControl>
                                    <FormControlLabel
                                        control={<Field type="checkbox" name="premium" as={Checkbox} />}
                                        label="Premium"
                                    />
                                    <Field as={TextField}
                                    label="membershipFee"
                                    name='membershipFee'
                                    type="number"
                                    variant='outlined'
                                    helperText={props.values.premium && <ErrorMessage name='membershipFee'/>}
                                    required
                                    disabled={!props.values.premium}
                                    />
                                    <Button type='submit' color='primary' variant='contained' style={{marginBottom: '5px'}}>
                                        {l ? <CircularProgress size='25px' color='inherit'/> : (location.state ? 'Edit' : 'Create')}
                                    </Button>
                                    <Button onClick={()=>{navigate('/')}} color='error' variant='contained'>cancel</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                <Snackbar open={open} autoHideDuration={6000} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
                </Snackbar>
            </Paper>
        </Box>
    )
}