import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Comment from "./Comment";

const Post = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState([])
  const { state } = useLocation();
  const { id, editor } = state

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title)
        setMessage(data.message)
        setComments(data.comments.map((comment, i) => {
          return <Comment key={i} commentId={comment} postId={id} editor={editor} />
        }))
      })
  }, [])

  return (
    <div className="container">
      <div className="card">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{message}</p>
        <form action={`${import.meta.env.VITE_SERVER_URL}/api/comment`}  className="form" method="POST">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name="name" id="name" placeholder="Your name" className="form-control" />
          <label htmlFor="comment" className="form-label">Comment</label>
          <input type="text" name="comment" placeholder="comment" id="comment" className="form-control" />
          <input type="hidden" name="postid" value={id} />
          <button type="submit" className="btn-primary btn mt-2">Place comment</button>
        </form>
        <div className="comments mt-2">
          {comments}
        </div>
      </div>
    </div>
    </div>
    
  )
};

export default Post;
