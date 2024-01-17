import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import MoreVert from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { blue } from '@mui/material/colors';
import axios from '../config/axios';

export default function ShowComments(props) {
  const {postId} = props
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentUsers, setCommentUsers] = useState([]);
  const comments = useSelector((state) => {
    return state.comments.data.filter(com=>com.post==postId)
  });

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('api/allUsers')
        setCommentUsers(response.data)
      };
      fetchData();
  }, [comments]);

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {(comments.length && commentUsers.length) ? (
        comments.map((comment) => {
          console.log(comment)
          const comUser = commentUsers.find(ele=>{
            return ele._id==comment.user
          })
          console.log(comUser)
          return (
            <List sx={{ flex: { xs: 40, md: 4 } }} p={2} key={comment._id}>
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
                <IconButton aria-label="like" size="small">
                  <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                </IconButton>
              </Box>
              <IconButton aria-label="options" sx={{ paddingTop: '15px' }} onClick={handleMenuClick}>
                <MoreVert />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem>edit</MenuItem>
                <MenuItem>delete</MenuItem>
              </Menu>
            </ListItem>
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
