import { AppBar, Avatar, styled, Toolbar, Typography, InputBase, Menu, MenuItem, Button, Box, Modal, Stack} from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import React, {useState, useEffect} from "react";
import Register from "./Register";
import Login from './Login'
import { useSelector, useDispatch } from "react-redux";
import { logoutFunc } from "../actions/userActions";
import {addDispatch} from '../actions/authActions'

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
})

const Search = styled('div')({
    display:'flex',
    justifyContent:'space-between',
    backgroundColor: 'white',
    padding: '0px 20px',
    width: '30%',
    borderRadius: '5px'
})

const Profile = styled('div')({
    height: '25px',
    width: 'auto',
    borderRadius: '15px',
    display: 'flex',
    gap:'5px'
})
export default function NavBar(props){
    const [open, setOpen] = useState(false)
    const [openRegisterModal, setOpenRegisterModal] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state)=>{
        return state.users.data
    })
    const handleLogout = () => {
        dispatch(logoutFunc())
    }
    const handleOpenRegisterModal = ()=> {
        setOpenRegisterModal(true)
    }
    const handleRegisterModalClose = ()=> {
        setOpenRegisterModal(false)
    }
    const handleOpenLoginModal = () => {
        setOpen(true)
        setOpenLoginModal(true)
    }
    const handleLoginModalClose = ()=> {
        setOpenLoginModal(false)
    }
    useEffect(() => {
        dispatch(addDispatch({
            handleOpenRegisterModal,
            handleRegisterModalClose,
            handleOpenLoginModal,
            handleLoginModalClose
        }));
    }, []);
    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Stack direction='row' >
                <Diversity3Icon sx={{padding: '2px 3px 0px 0px', marginLeft:'0'}}/>
                <Typography variant="h6" >
                    SNAPP
                </Typography>
                </Stack>
                <Search>
                    <InputBase placeholder='search...'/>
                </Search>
                <Profile>
                    <Avatar sx={{width:'25px', height: '25px'}} onClick={(e)=>{setOpen(true)}}/>
                    <Typography >{user.username ? user.username : 'Guest'}</Typography>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        open={open}
                        onClose={(e)=>{setOpen(false)}}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                    >
                        { !(localStorage.getItem('token')) ?
                            <Box>
                                <MenuItem onClick={handleOpenRegisterModal}>Register</MenuItem>
                                <MenuItem onClick={handleOpenLoginModal}>Login</MenuItem>
                            </Box>
                            : 
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            }
                        <Modal
                        open={openRegisterModal}
                        width='50'
                        >
                            <Register handleOpenLoginModal={handleOpenLoginModal} handleModalClose={handleRegisterModalClose}/>
                        </Modal>
                        <Modal
                        open={openLoginModal}
                        width='50'
                        >
                            <Login handleModalClose={handleLoginModalClose}/>
                        </Modal>
                    </Menu>
                </Profile>
            </StyledToolbar>
        </AppBar>
    )
}