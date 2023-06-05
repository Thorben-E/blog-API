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
      body: JSON.stringify({ postid: postId, token: localStorage.getItem('token') }),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.auth) {
          window.location.reload()
        } else {
          window.location.href = import.meta.env.VITE_EDITOR_CLIENT_URL
        }
      })
  }
  
  return (
    <div className="">
        <div className="border p-4 rounded">
            <p className="">{message}</p>
            <p className=""><b>{title}</b> at {date.split("T")[0]}</p>
            <button className="bg-zinc-700 hover:bg-zinc-800 text-white px-2 py-1 rounded mt-2" onClick={deleteComment}>Delete</button>
        </div>
    </div>
  )
};

export default Comment;
