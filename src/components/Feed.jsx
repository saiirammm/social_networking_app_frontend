import React, { useEffect, useState } from "react";
import { Box, CircularProgress} from "@mui/material";
import ShowPosts from "./ShowPosts";
import { useSelector } from "react-redux";
import Toaster from "./Toaster";
export default function Feed(props){
    const posts = useSelector((state)=>{
        return state.posts
    })
    const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(Boolean(Object.keys(posts.serverErrors).length));
    const timeoutId = setTimeout(() => {
      setSnackbarOpen(false);
    }, 6000);
    return () => clearTimeout(timeoutId);
  }, [posts.serverErrors]);
    return (
        posts ? (!Object.keys(posts.serverErrors).length ?
        <Box sx={{flex:{xs: 40, md: 4}}} p={2} >
            <ShowPosts posts={posts.data} />
        </Box> : 
        <Toaster error={snackbarOpen} errorMsg={posts.serverErrors.errors}/>) : 
        <Box height='600px' flex={4} p={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Box>
    )
}