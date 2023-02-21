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
  const [popup, setPopup] = useState('')
  const { state } = useLocation();
  const { id } = state

  const getPostData = () => {
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
  }

  useEffect(() => {
    getPostData() 
  }, [])

  const updatePost = async () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: title, message: message, author: author }),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(response => response.json())
      .then(window.location.reload())
  } 

  const deletePost = async () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(data => console.log(data))
      .then(window.location.href = import.meta.env.VITE_EDITOR_CLIENT_URL)
  }
  
  return (
    <article className="">
      <div className="">
        <label htmlFor="title" className="">Title</label>
        <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} className="" />
        <label htmlFor="message" className="">Message</label>
        <textarea name="message" id="message" rows="5" onChange={(e) => setMessage(e.target.value)} value={message} className=""></textarea>
        <label htmlFor="author">Author</label>
        <input type="text" name="author" id="author" onChange={(e) => setAuthor(e.target.value)} value={author} className="" />
        <button onClick={updatePost} className="">Update post</button>
        <button onClick={deletePost} className="">Delete post</button>
        <div className="">
          <h3>Comments</h3>
          {comments}
        </div>
      </div>
    </article>
    
  )
};

export default Post;
