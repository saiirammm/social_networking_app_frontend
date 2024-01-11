import { Box, List, ListItemIcon, ListItemButton} from "@mui/material";
import React, {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GroupIcon from '@mui/icons-material/Group';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Test(props){
    const user = useSelector((state)=>{
        return state.users.data
    })
    const community = useSelector((state)=>{
        return state.communities.data.find(com => com.createdBy == user._id)
    })
    const authHandlers = useSelector((state)=>{
        return state.auth
    })
    const navigate = useNavigate()
    const handleCreateCom = () => {
        if(localStorage.getItem('token')){
            navigate('/create/community')
        }else{
            authHandlers.handleOpenLoginModal()
        }
    }
    return (
        <Box flex={1} p={0} sx={{display:{xs: 'block', md: 'none'}}}>
            <Box position='fixed' margin='0'>
            <List sx={{bgcolor: 'background.paper' ,width: '10px'}}>
                <ListItemButton onClick={()=>{navigate('/')}}>
                    <ListItemIcon >
                        <HomeIcon/>
                    </ListItemIcon>
                </ListItemButton>
                { community ? 
                <List>
                    <ListItemButton onClick={()=>{navigate('/show/community', {state:{id: community._id}})}}>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={()=>{navigate('/create/post')}}>
                    <ListItemIcon>
                        <PostAddIcon />
                    </ListItemIcon>
                </ListItemButton>
                </List>
                :
                <ListItemButton onClick={handleCreateCom}>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                </ListItemButton> }
                
            </List>
        </Box>
        </Box>
    )
}