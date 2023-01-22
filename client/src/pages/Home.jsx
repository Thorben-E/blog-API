import React from "react"
import { useState } from "react";
import Post from "./Post";
import Login from './Login'

const Home = (props) => {
  const [posts, setPosts] = useState([])
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <>
      {loggedIn ? (
        <>
          <p>logged in</p>
          <h3>create post</h3>
          <form action={`${import.meta.env.VITE_CLIENT_URL}/api/create`} method="POST">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name="title" placeholder="Title" id="title" className="form-control" />
            <label htmlFor="message" className="form-label">Message</label>
            <textarea type="text" name="message" rows="8" placeholder="Message" id="message" className="form-control" />
            <button type="submit" className="btn btn-primary mt-3">Post</button>
          </form>
          <div className="posts mt-3">
            <Post />
          </div>
      </>
      ) : (
        <div>
          <Post postid={''}/>
        </div>
      )}
      
    </>
    
  )
};

export default Home;
