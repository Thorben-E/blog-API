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
    <main className="flex justify-center">
      <article className="flex flex-col border p-4 rounded gap-2 w-[600px] max-w-[60vw] mt-2">
        <div className="flex flex-row">
          <div className="w-[50%] bg-slate-200 rounded h-[100px] flex justify-center items-center">img</div>
          <div>
            <input type="file" name="updatefile" id="updatefile" />
          </div>
        </div>
        <label htmlFor="title" className="">Title</label>
        <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} className="border border-black rounded px-2 py-1" />
        <label htmlFor="message" className="">Message</label>
        <textarea name="message" id="message" rows="5" onChange={(e) => setMessage(e.target.value)} value={message} className="border border-black rounded px-2 py-1"></textarea>
        <label htmlFor="author">Author</label>
        <input type="text" name="author" id="author" onChange={(e) => setAuthor(e.target.value)} value={author} className="border border-black rounded px-2 py-1" />
        <div className="flex gap-2">
          <button onClick={updatePost} className="bg-zinc-700 hover:bg-zinc-800 text-white w-[120px] p-1 rounded mt-2">Update post</button>
          <button onClick={deletePost} className="bg-zinc-700 hover:bg-zinc-800 text-white w-[120px] p-1 rounded mt-2">Delete post</button>
        </div>
        <div className="">
          <h3 className="text-md">Comments</h3>
          {comments}
        </div>
      </article>
    </main>
    
    
  )
};

export default Post;
