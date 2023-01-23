import React from "react"
import Comment from "./Comment";

const Post = (postid) => {
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
