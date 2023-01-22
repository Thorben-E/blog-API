import React from "react"
import { useState } from "react";
import Post from "./Post";

const Home = (props) => {
  const [posts, setPosts] = useState([])

  return (
    <div>
        <Post postid={''}/>
    </div>
  )
};

export default Home;
