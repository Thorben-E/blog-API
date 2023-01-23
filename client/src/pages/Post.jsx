import React from "react"
import { useLocation } from "react-router-dom";
import Comment from "./Comment";

const Post = (postid) => {
  const { state } = useLocation();
  const { id } = state

  fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`)
    .then((response) => response.json())
    .then((data) => console.log(data))

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">title</h2>
        <p className="card-text">message</p>
        <div className="comments">
            <Comment />
        </div>
      </div>
        
    </div>
  )
};

export default Post;
