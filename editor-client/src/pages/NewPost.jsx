import React from "react"
import { useState } from "react";

const NewPost = (props) => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [img, setImg] = useState('')
  const [fileError, setFileError] = useState('')

  const onFormSubmit = (e) => {
    if (fileError) {
      return
    } else {
      e.preventDefault()
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title: title, message: message, img: img }),
        headers: {
          "Content-Type": 'application/json'
        }
      }).then(response => response.json())
        .then(data => console.log(data))
        .then(window.location.href = import.meta.env.VITE_EDITOR_CLIENT_URL)
      }
  }

  const fileChange = e => {
    if(e.target.files.length < 1){
      return;
    }
    const file = e.target.files[0];
    switch(file.type){
      case 'image/png':
        //('image type is png');
        setImg(file)
        break;
      case 'image/jpg':
        //('image/jpg')
        setImg(file)
        break;
      case 'image/jpeg':
        //('image is jpeg')
        setImg(file)
        break;
      default:
        setFileError('image must be png, jpg or jpeg type')
    }
  }

  return (
    <div className="container">
        <h3>create post</h3>
        <p className="fileError">{fileError}</p>
        <form onSubmit={(e) => onFormSubmit(e)}>
          <input
            type="file"
            onChange={fileChange}
          />
          <br></br> 
          <label htmlFor="title" className="">Title</label>
          <input 
            type="text" 
            name="title" 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Title" 
            id="title" 
            className="" 
          />
          <label htmlFor="message" className="">Message</label>
          <textarea 
            type="text"  
            name="message" 
            onChange={(e) => setMessage(e.target.value)} 
            rows="8" 
            placeholder="Message" 
            id="message" 
            className="" 
          />
          <button type="submit" className="">Post</button>
        </form>
    </div>
  )
};

export default NewPost; 