
import React from "react";
import { Box, Checkbox } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import  {blue} from '@mui/material/colors';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Carousel from 'react-material-ui-carousel'

export default function ShowPosts(props){
    const {posts} = props
    return (
    <Box flex={4} p={2} >
        {posts.length ? posts.map(post=>{
            return <Card sx={{margin:'0 auto', marginBottom: '10px'}}>
                        <CardHeader
                        sx={{height: 'auto', padding: '10px'}}
                            avatar={
                            <Avatar sx={{ bgcolor: blue[500] , height:'30px', width: '30px'}} aria-label="profile">
                                {/* {userName[0].toUpperCase()+userName[1].toUpperCase()} */}
                            </Avatar>
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={<Typography variant="h5">name</Typography>}
                        />
                        {post.content.length>1 ? <Carousel>
                            {post.content.map(ele=>{
                                return (post.type.includes('image') ? 
                                <CardMedia
                                    component='image'
                                    height="20%"
                                    image={ele}
                                    alt="img"
                                /> : 
                                <CardMedia
                                    CardMedia
                                    component="video" 
                                    autoPlay 
                                    controls 
                                    src={ele}
                                />)
                            })}
                        </Carousel> : 
                        post.type.includes('image') ? 
                        <CardMedia
                            component="img"
                            height="374px"
                            image={post.content[0]}
                            alt="img"
                        /> : 
                        <CardMedia
                            component='video'
                            height="374px"
                            controls  // Add this if you want playback controls (play, pause, etc.)
                            >
                            <source src={post.content[0]} type="video/mp4" />
                        </CardMedia>}
                        <Typography padding='10px' variant="h6">{post.title}</Typography>
                        <CardContent>
                            <Typography variant="p" >
                             {post.body} 
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                            <Checkbox  icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                }) : '...loading' }
                
    </Box>
)
}