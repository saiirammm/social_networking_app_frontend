import React, { useEffect, useState } from "react";
import { Box, CircularProgress} from "@mui/material";
import Typography from '@mui/material/Typography';
import {  useSelector } from "react-redux";
import Comments from "./Comments";
import { useLocation } from "react-router-dom";
import ShowComments from "./ShowComments";
import ShowPosts from "./ShowPosts";
export default function ShowPost(props){
    const location = useLocation()
    const post = location.state?.post
    const community = useSelector((state)=>{
        return state.communities.data.find(com=>location.state?.post.community==com._id)
    })
    return (
    <Box sx={{flex:{xs: 40, md: 4}}} p={2} >
        { Object.keys(post).length && community ? 
        <Box >
        <ShowPosts posts={[post]}/>
        <Typography  variant='h5'>Comments</Typography>
        <hr/>
        <Comments postId={post._id}/>
        <ShowComments postId={post._id} moderator={post.user} />
        </Box>
            : 
        <Box height='600px' flex={4} p={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Box> 
        }  
    </Box>
)
}