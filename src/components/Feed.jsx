import React, { useEffect, useState } from "react";
import { Alert, Box, Snackbar, Stack} from "@mui/material";
import ShowPosts from "./ShowPosts";
import { useSelector } from "react-redux";
export default function Feed(props){
    const posts = useSelector((state)=>{
        return state.posts
    })
    const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(Object.keys(posts.serverErrors).length);
    const timeoutId = setTimeout(() => {
      setSnackbarOpen(false);
    }, 6000);
    return () => clearTimeout(timeoutId);
  }, [posts.serverErrors]);
    return (
        !Object.keys(posts.serverErrors).length ?
            <Box sx={{flex:{xs: 40, md: 4}}} p={2} >
                <ShowPosts posts={posts.data} />
            </Box> : 
            <Snackbar open={snackbarOpen}
                autoHideDuration={null}
                onClose={() => setSnackbarOpen(false)}>
            <Alert severity='error' sx={{ width: '100%' }}>
                {posts.serverErrors.errors}
            </Alert>
            </Snackbar> 
    )
}