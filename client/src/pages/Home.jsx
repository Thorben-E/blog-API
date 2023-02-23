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
        return <Postpreview key={i} img={post.img} title={post.title} user={post.user} date={post.date} postid={post._id} />
      })))
  }, [])
  
  return (
    <main className=" flex flex-col gap-4 items-center">
      {posts}
    </main>
  )
};

export default Home;
