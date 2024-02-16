import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box,  IconButton, Menu, MenuItem } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { blue } from '@mui/material/colors';
import axios from '../config/axios';
import Comments from './Comments';
import { deleteComDispatch } from '../actions/commentActions';

export default function ShowComments(props) {
  const {postId, moderator} = props
  const [commentUsers, setCommentUsers] = useState([]);
  const [commentEdits, setCommentEdits] = useState({});
  const dispatch = useDispatch()
  const user = useSelector((state)=>{
    return state.users.data
  })
  const comments = useSelector((state) => {
    return state.comments.data.filter(com=>com.post==postId)
  });

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('api/allUsers')
        setCommentUsers(response.data)
      };
      fetchData();
  }, []);

  const [anchorElMap, setAnchorElMap] = useState({});

  const handleMenuClick = (commentId, e) => {
    setAnchorElMap((prev) => ({ ...prev, [commentId]: e.currentTarget }));
  };

  const handleCloseMenu = (commentId) => {
    setAnchorElMap((prev) => ({ ...prev, [commentId]: null }));
  };

  const handleEdit = (commentId) => {
    setCommentEdits((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    handleCloseMenu(commentId)
  };
  const handleDelete = async(id) => {
    try{
      await axios.delete(`api/comment/delete/${id}`)
      dispatch(deleteComDispatch(id))
    }
    catch(e){
      alert(e.response.data.error)
    }
  }

  return (
    <div>
      {(comments.length && commentUsers.length) ? (
        comments.map((comment) => {
          const comUser = commentUsers.find(ele=>{
            return ele._id==comment.user
          })
          return (
            <List sx={{ flex: { xs: 40, md: 4 } }} p={2} key={comment._id}>
            {commentEdits[comment._id] ? <Comments data={comment.content} commentId={comment._id} handleEdit={() => handleEdit(comment._id)}/> : 
            <ListItem alignItems="flex-start" display="flex">
            <Box display="flex" width="100%">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[800], fontSize: '15px' }} aria-label="profile">
                  {comUser ? <Typography>{comUser.username[0].toUpperCase()}</Typography> : null}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={comUser?.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'block' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.content}
                    </Typography>
                  </React.Fragment>
                }
              />
            </Box>
          <IconButton aria-label="options" sx={{ paddingTop: '15px' }} onClick={(e) => handleMenuClick(comment._id, e)}>
            <MoreVert />
          </IconButton>
          <Menu elevation={2} anchorEl={anchorElMap[comment._id]} open={Boolean(anchorElMap[comment._id])} onClose={() => handleCloseMenu(comment._id)}>
          {
            user._id==comment.user ? 
            <Box>
            <MenuItem onClick={() =>{handleEdit(comment._id)}}>edit</MenuItem>
            <MenuItem onClick={()=>{handleDelete(comment._id)}}>delete</MenuItem>
            </Box> 
           : 
            user._id==moderator ? 
              <MenuItem onClick={()=>{handleDelete(comment._id)}}>delete</MenuItem> : 
              <MenuItem>report</MenuItem>
            }
          </Menu>
          </ListItem>}
            <Divider variant="inset" component="li" />
          </List>
          )
        })
      ) : (
        'no comments'
      )}
    </div>
  );
}
