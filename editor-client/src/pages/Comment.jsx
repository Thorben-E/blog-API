import React from "react"
import { useState } from "react";
import { useEffect } from "react";

const Comment = ({ commentId, postId, editor }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/${commentId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title)
        setMessage(data.message)
        setDate(data.date)
      })
  }, [])
  
  const deleteComment = async () => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/${commentId}`, {
      method: "DELETE",
      body: JSON.stringify({ postid: postId }),
      headers: {
        "Content-Type": 'application/json'
      }
    })
    window.location.reload()
  }
  
  return (
    <div className="card mt-3">
        <div className="card-body">
            <p className="card-text">{message}</p>
            <p className="card-title"><b>{title}</b> at {date}</p>
            <button className="btn btn-primary btn-sm" onClick={deleteComment}>Delete</button>
        </div>
    </div>
  )
};

export default Comment;
