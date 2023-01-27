import React from "react"
import { useState } from "react";

const NewPost = (props) => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title: title, message: message }),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(response => response.json())
      .then(data => console.log(data))
      .then(window.location.href = import.meta.env.VITE_EDITOR_CLIENT_URL)
  }

  return (
    <div className="container">
        <h3>create post</h3>
        <form onSubmit={(e) => onFormSubmit(e)}> 
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} placeholder="Title" id="title" className="form-control" />
          <label htmlFor="message" className="form-label">Message</label>
          <textarea type="text" name="message" onChange={(e) => setMessage(e.target.value)} rows="8" placeholder="Message" id="message" className="form-control" />
          <button type="submit" className="btn btn-primary mt-3">Post</button>
        </form>
    </div>
  )
};

export default NewPost; 