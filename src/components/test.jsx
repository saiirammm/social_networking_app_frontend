import { Box, List, ListItemIcon, ListItemButton, Tooltip} from "@mui/material";
import React, {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FlagIcon from '@mui/icons-material/Flag';
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
            <Box position='fixed' margin='-8px' paddingTop='20px'>
            <List sx={{bgcolor: 'background.paper' ,width: '10px'}} >
                <ListItemButton onClick={()=>{navigate('/')}}>
                <Tooltip title="home" placement="bottom">
                    <ListItemIcon >
                        <HomeIcon/>
                    </ListItemIcon>
                </Tooltip>
                </ListItemButton>
                { community ? 
                <List>
                <ListItemButton onClick={()=>{navigate('/show/community', {state:{id: community._id}})}}>
                <Tooltip title="my community" placement="bottom">
                    <ListItemIcon >
                        <GroupIcon />
                    </ListItemIcon>
                </Tooltip>
                </ListItemButton>
                <ListItemButton onClick={()=>{navigate('/create/post')}}>
                <Tooltip title="create post" placement="bottom">
                    <ListItemIcon>
                        <PostAddIcon />
                    </ListItemIcon>
                </Tooltip>
                </ListItemButton>
                </List>
                :
                <ListItemButton onClick={handleCreateCom}>
                    <Tooltip title="create community" placement="bottom">
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    </Tooltip>
                </ListItemButton> }
                {user.role=='admin' && 
                <>
                <ListItemButton >
                <Tooltip title="reported posts" placement="bottom">
                <ListItemIcon>
                    <FlagIcon />
                </ListItemIcon>
                </Tooltip>
                </ListItemButton>
                <ListItemButton >
                <Tooltip title="reported communities" placement="bottom">
                    <ListItemIcon>
                        <FlagIcon />
                    </ListItemIcon>
                </Tooltip>
                </ListItemButton>
                </>}
            </List>
        </Box>
        </Box>
    )
}