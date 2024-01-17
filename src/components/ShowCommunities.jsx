import { Box, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ShowCommunities(props){
    const location = useLocation()
    const id = location.state.id
    const navigate = useNavigate()
    const [focusedIndex, setFocusedIndex] = useState(null);
    const communities = useSelector((state)=>{
        return state.communities.data
    })
    const handleFocus = (i) => {
        setFocusedIndex(i)
    }

    const handleBlur = () => {
        setFocusedIndex(null)
    }
    const result = communities.filter(e=>{
        return e.category == id
    })
    return (
        <Box sx={{flex:{xs: 40, md: 4}}} p={2}>
            <Box display='flex' flexDirection='column' gap={2}>
            {result.length ? 
                    result.map((e, i)=>{
                        return (
                        <Paper 
                            key={i}
                            elevation={focusedIndex === i ? 12 : 2}
                            tabIndex={0} 
                            sx={{height:'auto', 
                            borderRadius:'10px',
                            transition: 'elevation 0.3s ease'}}
                            onMouseOver={() => handleFocus(i)}
                            onMouseOut={handleBlur}
                            onClick={()=>navigate(`/show/community`, {state:{id:e._id}})}>
                                <List disablePadding>
                                    <ListItem sx={{bgcolor: '#42a5f5'}}>
                                        <ListItemText primary={e.name} />
                                    </ListItem>
                                    <ListItem sx={{bgcolor: '#bbdefb'}}>
                                        <ListItemText primary={e.description}/>
                                    </ListItem>
                                </List>
                        </Paper>)
                    }) : 
                    <Box height='500px' display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Typography variant="h6">No Communities in this Category</Typography>
                    </Box>
                    }
            </Box>
        </Box>
    )
}