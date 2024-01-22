import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from '../config/axios'
import ShowPosts from "./ShowPosts";
import Toaster from "./Toaster";

export default function ReportedPosts(props){
    const [posts, setPosts] = useState({data: [], loading: true})
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    useEffect(()=>{
        setTimeout(()=>{
            setError(false)
            setOpen(false)
        }, 6000)
    }, [posts])
    const removePosts = async(id) => {
        try{
            const response = axios.delete(`api/removeReport/${id}`)
            setMessage(response.data.message)
            const remove = posts.filter(post=>post._id!==id)
            setPosts(remove)
            setOpen(true)
        }catch(e){
            setErrorMsg(e.response.data.errors)
            setError(true)
        }
    }
    useEffect(()=>{
        (async() => {
            try{
                const response = await axios.get('api/getRepPosts')
                const repPosts = response.data
                setPosts({data: [...repPosts], loading: false})
            }catch(e){
                alert(e.code)
                setPosts({...posts, loading: false})
            }
        })()
    }, [])
    return (
        !posts.loading ?
        (posts.data.length ? 
        <Box sx={{flex:{xs: 40, md: 4}}} p={2} >
            <ShowPosts posts={posts.data} removePosts={removePosts}/>
            <Toaster success={open} successMsg={message}/>
            <Toaster error={error} errorMsg={errorMsg}/>
        </Box> : 
        <Box height='500px' display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h6">No Reported Posts</Typography>
        </Box>
        ) : 
        <Box height='600px' flex={4} p={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Box>
    )
}