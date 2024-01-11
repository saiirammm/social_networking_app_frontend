import React from "react";
import { Box, Stack} from "@mui/material";
import ShowPosts from "./ShowPosts";
import { useSelector } from "react-redux";
export default function Feed(props){
    const posts = useSelector((state)=>{
        return state.posts.data
    })
    console.log(posts)
    return (
        <Box sx={{flex:{xs: 40, md: 4}}} p={2} >
            <ShowPosts posts={posts} />
        </Box>
    )
}