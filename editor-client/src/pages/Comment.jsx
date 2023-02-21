import React from "react"
import { useState } from "react";
import { useEffect } from "react";

const Comment = ({ commentId, postId, editor }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  
  const getCommentData = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/${commentId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title)
        setMessage(data.message)
        setDate(data.date)
      })
  }

  useEffect(() => {
    getCommentData() 
  }, [])
  
  const deleteComment = async () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/${commentId}`, {
      method: "DELETE",
      body: JSON.stringify({ postid: postId }),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(window.location.reload())
  }
  
  return (
    <div className="">
        <div className="">
            <p className="">{message}</p>
            <p className=""><b>{title}</b> at {date}</p>
            <button className="" onClick={deleteComment}>Delete</button>
        </div>
    </div>
  )
};

export default Comment;
