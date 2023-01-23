import React from "react"
import { useState } from "react";
import Postpreview from "./Postpreview";
import Login from './Login'
import { useEffect } from "react";

const Home = (props) => {
  const [posts, setPosts] = useState([])
  const [viewerPosts, setViewerPosts] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  if (loggedIn) {
    useEffect(() => {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts`)
        .then((response) => response.json())
        .then((data) => setPosts(data.map((post, i) => {
          return <Postpreview key={i} title={post.title} user={post.user} date={post.date} postid={post._id} editor={true} />
        })))
    }, [])
  } else {
    useEffect(() => {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts`)
        .then((response) => response.json())
        .then((data) => setViewerPosts(data.map((post, i) => {
          return <Postpreview key={i} title={post.title} user={post.user} date={post.date} postid={post._id} />
        })))
    }, [])
  }
  
  
  return (
    <>
      {loggedIn ? (
        <>
          <p>logged in</p>
          <h3>create post</h3>
          <form action={`${import.meta.env.VITE_SERVER_URL}/api/create-post`} method="POST"> <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name="title" placeholder="Title" id="title" className="form-control" />
            <label htmlFor="message" className="form-label">Message</label>
            <textarea type="text" name="message" rows="8" placeholder="Message" id="message" className="form-control" />
            <button type="submit" className="btn btn-primary mt-3">Post</button>
          </form>
          <div className="posts mt-3">
            {posts}
          </div>
      </>
      ) : (
        <div>
          {viewerPosts}
        </div>
      )}
      
    </>
    
  )
};

export default Home;
