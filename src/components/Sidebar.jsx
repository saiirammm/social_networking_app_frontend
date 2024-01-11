import { Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Collapse } from "@mui/material";
import React, {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function SideBar(props){
    const [open, setOpen] = useState(false)
    const categoryData = useSelector((state)=>{
        return state.categories.data
    })
    const user = useSelector((state)=>{
        return state.users.data
    })
    console.log(user)
    const community = useSelector((state)=>{
        return state.communities.data.find(com => com.createdBy == user._id)
    })
    console.log(community)
    const authHandlers = useSelector((state)=>{
        return state.auth
    })
    const navigate = useNavigate()
    const handleClick = () => {
        setOpen(!open)
    }
    const handleCatClick = (id) => {
        navigate('/category/communities', {state:{id: id}})
    }
    const handleCreateCom = () => {
        if(localStorage.getItem('token')){
            navigate('/create/community')
        }else{
            authHandlers.handleOpenLoginModal()
        }
    }
    return (
        <Box flex={2} p={2} sx={{display:{xs: 'none', md: 'block'}}}>
            <Box position='fixed' >
            <List sx={{bgcolor: 'background.paper'}}>
                <ListItemButton onClick={()=>{navigate('/')}}>
                    <ListItemIcon >
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="categories" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {categoryData.map((e)=>{
                            return (
                                <ListItemButton key={e._id} onClick={()=>{handleCatClick(e._id)}}>
                                    <ListItemText primary={e.name}/>
                                </ListItemButton>
                            )
                        })}
                    </List>
                </Collapse>
                { community ? 
                <List>
                    <ListItemButton onClick={()=>{navigate('/show/community', {state:{id: community._id}})}}>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary='My Community' />
                </ListItemButton>
                <ListItemButton onClick={()=>{navigate('/create/post')}}>
                    <ListItemIcon>
                        <PostAddIcon />
                    </ListItemIcon>
                    <ListItemText primary='Create Post' />
                </ListItemButton>
                </List>
                :
                <ListItemButton onClick={handleCreateCom}>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary='Create Community' />
                </ListItemButton> }
                
                
            </List>
        </Box>
        </Box>
    )
}