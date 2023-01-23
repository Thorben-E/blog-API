import React from "react"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Comment from "./Comment";

const Post = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState([])
  const { state } = useLocation();
  const { id } = state

  fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setTitle(data.title)
      setMessage(data.message)
      setComments(data.comments.map((comment) => {
        return <Comment title={comment.title} message={comment.message} date={comment.data} />
      }))
    })

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{message}</p>
        <form action="/api/create-comment" className="form" method="post">
          <label htmlFor="comment" className="form-label">Comment</label>
          <input type="text" name="comment" placeholder="comment" id="comment" className="form-control" />
          <button type="submit" className="btn-primary btn mt-2">Place comment</button>
        </form>
        <div className="comments">
          {comments}
        </div>
      </div>
    </div>
  )
};

export default Post;
