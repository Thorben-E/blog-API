import React from "react"
import { useState } from "react";
import Postpreview from "./Postpreview";
import { useEffect } from "react";

const Home = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setPosts(data.map((post, i) => {
        return <Postpreview key={i} title={post.title} user={post.user} date={post.date} postid={post._id} />
      })))
  }, [])
  
  return (
    <div className="container mt-2 d-flex justify-content-center">
      {posts}
    </div>
  )
};

export default Home;
