import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { redirect, useLocation } from "react-router-dom";
import Comment from "./Comment";

const Post = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [author, setAuthor] = useState('')
  const [comments, setComments] = useState([])
  const { state } = useLocation();
  const { id } = state

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title)
        setMessage(data.message)
        setAuthor(data.user)
        setComments(data.comments.map((comment, i) => {
          return <Comment key={i} commentId={comment} postId={id} />
        }))
      })
  }, [])

  const updatePost = async () => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: title, message: message, author: author }),
      headers: {
        "Content-Type": 'application/json'
      }
    })
  } 

  const deletePost = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`, {
      method: 'DELETE'
    }) 
  }
  
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" />
          <label htmlFor="message" className="form-label">Message</label>
          <textarea name="message" id="message" rows="5" onChange={(e) => setMessage(e.target.value)} value={message} className="form-control"></textarea>
          <label htmlFor="author">Author</label>
          <input type="text" name="author" id="author" onChange={(e) => setAuthor(e.target.value)} value={author} className="form-control" />
          <button onClick={updatePost} className="btn-primary btn mt-2">Update post</button>
          <button onClick={deletePost} className="btn-danger btn mx-2 mt-2">Delete post</button>
          <div className="comments mt-2">
            <h3>Comments</h3>
            {comments}
          </div>
        </div>
    </div>
    </div>
    
  )
};

export default Post;
