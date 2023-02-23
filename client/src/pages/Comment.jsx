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
  }
  
  return (
    <div className="w-[80%] border rounded p-4">
        <p className=""><b>{title}</b> at {date}</p>
        <p className="">{message}</p>
    </div>
  )
};

export default Comment;
