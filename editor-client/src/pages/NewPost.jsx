import React from "react"
import { useState } from "react";
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

const NewPost = (props) => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [img, setImg] = useState()

  const urlEndpoint = 'https://ik.imagekit.io/hqpb7y53n'

  const onFormSubmit = (e) => {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title: title, message: message, img: img, token: localStorage.getItem('token') }),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(response => response.json())
      .then(data => console.log(data))
      .then(window.location.href = import.meta.env.VITE_EDITOR_CLIENT_URL)
  }

  const onError = err => {
    console.log("Error", err);
  };

  const onSuccess = res => {
    console.log("Success", res);
    setImg(res.url)
  };

  return (
    <main className="flex flex-col gap-2 items-center">
        <h3 className="text-xl text-center mt-2">create post</h3>
        <form 
          onSubmit={(e) => onFormSubmit(e)}
          className="flex border flex-col w-[600px] max-w-[80vw] p-4 rounded">
          <div className="flex flex-row">
            {img && <img src={img} alt="img cannot load" className="w-[50%]" />}
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
          <br></br> 
          <label 
            htmlFor="title" 
            className="">Title</label>
          <input 
            type="text" 
            name="title" 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Title" 
            id="title" 
            className="border border-black rounded px-2 py-1" 
          />
          <label 
            htmlFor="message" 
            className="">Message
          </label>
          <textarea 
            type="text"  
            name="message" 
            onChange={(e) => setMessage(e.target.value)} 
            rows="8" 
            placeholder="Message" 
            id="message" 
            className="border border-black rounded px-2 py-1" 
          />
          <button type="submit" className="bg-zinc-700 hover:bg-zinc-800 text-white w-[60px] p-1 rounded mt-2">Post</button>
        </form>
    </main>
  )
};

export default NewPost; 