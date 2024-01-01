import { Box, Card, CardMedia, Stack, Typography, IconButton } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Snackbar,TextField, TextareaAutosize} from '@mui/material'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup' 
import axios from '../config/axios';


export default function CreatePost() {
  const [l, setL] = useState(false)
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }
      if (rejectedFiles?.length) {
        alert(rejectedFiles[0].errors[0].code);
      }
    },[]);
    const removeFile = (indexToRemove) => {
      setFiles((prevFiles) => prevFiles.filter((file, index) => index !== indexToRemove));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 4, accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/*': ['.mp4', '.avi', '.mkv'],
    } });

    const initialValues = {
      title: '',
      body: '',
      communityId: ''
      
  }
  const handleSubmit = async(values, {resetForm, setSubmitting}) => {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('body', values.body)
      files.forEach((file, index) => formData.append(`content`, file))
      console.log(formData)
      try{
        const response = await axios.post('api/post/create', formData)
        console.log(response)
      }catch(e){
        console.log(e)
      }
  }
    const validationSchema = Yup.object().shape({
      title : Yup.string().required('title cannot be empty'),
      body: Yup.string().required('body cannot be empty')
    });

  return (
    <Box flex={4} p={2}>
      <Box sx={{width:'100%', padding: '20px 40px', margin:'0 auto', height:'auto'}} elevation={5}>
          <Typography variant='h6' textAlign='center' paddingBottom="10px">Create Post</Typography>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
              {(props)=>(
                  <Form >
                    {console.log(props)}
                      <Stack spacing={2}>
                          <Field as={TextField}
                          label="title"
                          name='title'
                          type="text"
                          variant='outlined'
                          helperText={<ErrorMessage name='title'/>}
                          required
                          />
                          <Box
                            sx={{
                              width: 'auto',
                              height: 'auto',
                              borderRadius: '5px',
                              border: '2px dotted grey',
                              padding: '20px',
                            }}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <p>Drop the files here ...</p>
                            ) : (
                              <Typography padding='5px' textAlign='center' variant='h6'>
                                Drag 'n' drop some files here, or click to select files
                              </Typography>
                            )}
                            <Stack sx={{direction: {xs: 'column', md: 'row'}}} justifyContent='center' gap={2}>
                              {files.map((file, i) => (
                                <Card key={i} sx={{ margin: '10px', textAlign: 'center' }}>
                                  <CardMedia component="img" width="100%" height="100px" image={file.preview} onLoad={()=> URL.revokeObjectURL(file.preview)} alt="Card image" />
                                  <IconButton onClick={event => {event.stopPropagation()
                                      removeFile(i)}} aria-label="remove">
                                    <DeleteIcon />
                                  </IconButton>
                                </Card>
                              ))}
                            </Stack>
                          </Box>
                          <Field as={TextField}
                          label="body"
                          name='body'
                          type="text"
                          variant='outlined'
                          helperText={<ErrorMessage name='body'/>}
                          required
                          />
                          <Button type='submit' color='primary' variant='contained' style={{marginBottom: '5px'}}>{l ? <CircularProgress size='25px' color='inherit'/> : 'Create post'}</Button>
                          
                      </Stack>
                  </Form>
              )}
            </Formik>
      </Box>
    </Box>
  );
}