import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { redirect, useLocation } from "react-router-dom";
import { IKContext, IKUpload } from 'imagekitio-react';
import Comment from "./Comment";

const Post = () => {
  const [img, setImg] = useState()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [author, setAuthor] = useState('')
  const [comments, setComments] = useState([])
  const [popup, setPopup] = useState('')
  const { state } = useLocation();
  const { id } = state

  const urlEndpoint = 'https://ik.imagekit.io/hqpb7y53n'

  const getPostData = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        setImg(data.img)
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

  const onError = err => {
    console.log("Error", err);
  };

  const onSuccess = res => {
    console.log("Success", res);
    setImg(res.url)
  };

  const updatePost = async () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ img: img, title: title, message: message, author: author, token: localStorage.getItem('token') }),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(response => response.json())
      .then(data => console.log(data))
  } 

  const deletePost = async () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    }).then(response => response.json())
      .then(data => console.log(data))
      .then(window.location.href = import.meta.env.VITE_EDITOR_CLIENT_URL)
  }
  
  return (
    <main className="flex justify-center">
      <article className="flex flex-col border p-4 rounded gap-2 w-[600px] max-w-[60vw] mt-2">
        <div className="flex flex-row">
          <img src={img} alt="" className="w-[50%]"/>
          <IKContext
              urlEndpoint={urlEndpoint} 
              publicKey={import.meta.env.VITE_imagekit_public_key} 
              authenticationEndpoint={import.meta.env.VITE_imagekit_auth_endpoint}
            >
              <IKUpload
                fileName="test-upload.png"
                onError={onError}
                onSuccess={onSuccess}
              />
            </IKContext>
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
