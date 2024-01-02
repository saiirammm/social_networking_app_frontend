import React from "react";
import { Routes, Route} from 'react-router-dom'
import Feed from "./Feed";
import ShowCommunities from "./ShowCommunities";
import CreateCommunity from "./CreateCommunity";
import CreatePost from './CreatePost'
import ShowCommunity from "./ShowCommunity";

export default function RouteList(props){
    return (
        <Routes>
            <Route path='/' element={<Feed/>} />
            <Route path='/category/communities' element={<ShowCommunities/>} />
            <Route path="/create/community" element={<CreateCommunity/>} />
            <Route path='/create/post' element={<CreatePost />} />
            <Route path='/show/community' element={<ShowCommunity/>} />
        </Routes>
    )
} 