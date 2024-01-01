
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
import  {blue, red} from '@mui/material/colors';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Feed(props){
    
        return (
        <Box flex={4} p={2} >
            <Card sx={{margin:'5'}}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        OP
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title="EREN YEAGER"
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="20%"
                    image="https://cdn.vox-cdn.com/thumbor/TJQdq_1pXM-6SioIby5AouXd7bw=/0x0:2000x800/1820x1024/filters:focal(840x240:1160x560):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72585995/5265_SeriesHeaders_OP_2000x800_wm.0.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    One Piece (stylized in all caps) is a Japanese anime television series produced
                     by Toei Animation that premiered on Fuji TV in October 1999. It is based on Eiichiro Oda's manga 
                     series of the same name. The story follows the adventures of Monkey D. Luffy, a boy whose body gained
                      the properties of rubber after unintentionally eating a Devil Fruit. 
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
            <Card sx={{marginTop: '15px'}} >
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        OP
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title="LUFFY"
                    subheader="january 31, 2023"
                />
                <CardMedia
                    component="img"
                    height="20%"
                    image="https://www.hindustantimes.com/ht-img/img/2023/11/02/1600x900/aot_finale_1681995878167_1698949851654.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Eren Yeager was a former member of the Survey Corps. 
                        He was the main protagonist of Attack on Titan. He lived in Shiganshina District with his parents 
                        until the fall of Wall Maria, where he impotently witnessed his mother being eaten by a Titan. 
                        This event would lead to Eren's intense hatred towards the Titans as he swore to wipe all of them off the face of the Earth. 
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
        </Box>
    )
}