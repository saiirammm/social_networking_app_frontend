import { Box, CircularProgress, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../config/axios";
import ShowPosts from "./ShowPosts";
export default function ShowCommunity(props){
    const location = useLocation()
    const community = useSelector((state)=>{
        return state.communities.data.find(com=> com._id == location.state.id)
    })
    console.log(community)
    return (
        community ?
        <Box flex={4} p={4}>
            <h1>{community.name} - {community.premium ? <b>premium</b> : <b>free</b> }</h1>
            <h3>{community.description}</h3>
        </Box>
        : 
        <Box height='600px' flex={4} p={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Box>
    )
}